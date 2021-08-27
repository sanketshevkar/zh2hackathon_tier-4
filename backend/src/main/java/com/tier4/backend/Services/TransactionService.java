package com.tier4.backend.Services;


import com.tier4.backend.Repositories.PotRepo;
import com.tier4.backend.Repositories.UserRepo;
import com.tier4.backend.Repositories.VectorRepo;
import com.tier4.backend.Utils.Converter;
import com.tier4.backend.web.Domain.Pot;
import com.tier4.backend.web.Domain.User;
import com.tier4.backend.web.Domain.Vector;
import com.tier4.backend.web.Model.OnBoarding.V2.AccountTransferRequest;
import com.tier4.backend.web.Model.OnBoarding.V2.Amount;
import com.tier4.backend.web.Model.Pot.PotDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TransactionService {

    @Autowired
    private VectorRepo vectorRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PotRepo potRepo;

    private RestTemplate restTemplate;

    private double buffer;
    private double newAmount;


    public TransactionService(RestTemplateBuilder templateBuilder){
        this.restTemplate = templateBuilder.build();
    }

    @Transactional
    public List<PotDto> distributeMoneyToPots(String phoneNumber, Double amount){

        log.info("PHONE NUMBER :"+phoneNumber);

        Vector vector = vectorRepo.getByValue(phoneNumber);

        log.info("VECTOR INSIDE DEDUCT FUNCTION "+vector);

        //amount = vector.getMultiplier() * amount;

        AccountTransferRequest accountTransferRequest = AccountTransferRequest.builder()
                .requestID(UUID.randomUUID().toString())
                .debitAccountID("a87a1266-2e3a-478f-950e-d893f42f8423")
                .creditAccountID(vector.getAccountID())
                .transferCode("ATLAS_P2M_AUTH")
                .amount(Amount.builder()
                        .amount(amount+"")
                        .currency("INR")
                        .build())
                .remarks("TEST")
                .transferTime("12324254832342")
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity httpEntity = new HttpEntity(accountTransferRequest,headers);

        log.info("LINE 76: Transaction Service "+restTemplate.exchange("https://fusion.preprod.zeta.in/api/v1/ifi/140793/transfers", HttpMethod.POST, httpEntity, new ParameterizedTypeReference<Object>() {
        }).getStatusCode());

        this.buffer = Double.parseDouble(vector.getLeftOver());
        this.newAmount = amount;

        User user = vector.getUser();
        List<Pot> pot = user.getPot();


        pot.stream().forEach(pot1 ->{

            if(pot1.getCurrentAmount() < pot1.getAmount()) {

                distributeAmountOnWeight(pot1, this.newAmount+this.buffer);

            }
                if(Integer.parseInt(pot1.getTimeLeft()) != 0 || Integer.parseInt(pot1.getTimeLeft())!=0) {
                    pot1.setTimeLeft(Integer.toString(Integer.parseInt(pot1.getTimeLeft()) - 1));
                }

        });

        potRepo.saveAll(pot);
        vector.setLeftOver(Double.toString(this.buffer));
        Double value = (Double.parseDouble(vector.getPrevAvg())*vector.getTotalDays()+amount)/(vector.getTotalDays()+1);
        vector.setPrevAvg(Double.toString(value));
        vector.setTotalDays(vector.getTotalDays()+1);
        vectorRepo.save(vector);

        pot = PotService.weightOptimizer(pot);
        potRepo.saveAll(pot);
        user.setPot(pot);
        userRepo.save(user);

        return pot.stream()
                .map(Converter::potToPotDto)
                .collect(Collectors.toList());
    }


    public void distributeAmountOnWeight(Pot pot,Double amount){

        Double currentAmount = pot.getCurrentAmount();
        Double totalAmount = pot.getAmount();
        Double weight = pot.getWeight();

        if(totalAmount <= currentAmount + weight*amount){

            amount = amount*weight - (totalAmount - currentAmount);

            currentAmount = totalAmount;
            pot.setCurrentAmount(currentAmount);

            this.buffer = amount;

        }
        else{

            currentAmount = currentAmount + weight * amount;
            pot.setCurrentAmount(currentAmount);
        }
    }


    //40 - 50 : 10 ; 455 - 460 : 5 ;
    //3x 5x 10x 20x

    @Transactional
    public List<PotDto> calcMultipliedVal(Double extAmount, String phoneNumber){


        Double amount = ((Math.floor(extAmount/10)+1)*10);


        return distributeMoneyToPots(phoneNumber, amount-extAmount);

    }

    @Transactional
    public List<PotDto> recalcMultipliedVal(Long potId, String phoneNumber) {


        return redeductAmount(potId,phoneNumber);
    }

    private List<PotDto> redeductAmount(Long potId, String phoneNumber) {

        Pot pot = potRepo.getById(potId);
        Vector vector = vectorRepo.getByValue(phoneNumber);

        AccountTransferRequest accountTransferRequest = AccountTransferRequest.builder()
                .requestID(UUID.randomUUID().toString())
                .debitAccountID(vector.getAccountID())
                .creditAccountID("a87a1266-2e3a-478f-950e-d893f42f8423")
                .transferCode("ATLAS_P2M_AUTH")
                .amount(Amount.builder()
                        .amount(Math.floor(pot.getCurrentAmount())+"")
                        .currency("INR")
                        .build())
                .remarks("TEST")
                .transferTime("12324254832342")
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity httpEntity = new HttpEntity(accountTransferRequest,headers);

        log.info("LINE 76: Transaction Service "+restTemplate.exchange("https://fusion.preprod.zeta.in/api/v1/ifi/140793/transfers", HttpMethod.POST, httpEntity, new ParameterizedTypeReference<Object>() {
        }).getStatusCode());

        pot.setCurrentAmount(-1.0);
        potRepo.save(pot);

        return vector.getUser().getPot().stream().map(Converter::potToPotDto).collect(Collectors.toList());
    }

    @Transactional
    public void saveMultiplierForUser(String phoneNumber, int multiplier){

        Vector vector = vectorRepo.getByValue(phoneNumber);
        vector.setMultiplier(multiplier);
        vectorRepo.save(vector);
    }

    public int getUserMultiplier(String phoneNumner) {

        return vectorRepo.getByValue(phoneNumner).getMultiplier();
    }


}
