package com.tier4.backend.Services;


import com.tier4.backend.Repositories.PotRepo;
import com.tier4.backend.Repositories.UserRepo;
import com.tier4.backend.Repositories.VectorRepo;
import com.tier4.backend.Utils.Converter;
import com.tier4.backend.web.Domain.Pot;
import com.tier4.backend.web.Domain.User;
import com.tier4.backend.web.Domain.Vector;
import com.tier4.backend.web.Model.Pot.PotDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionService {

    private final VectorRepo vectorRepo;
    private final UserRepo userRepo;
    private final PotRepo potRepo;

    private double buffer;
    private double newAmount;

    @Transactional
    public List<PotDto> distributeMoneyToPots(String phoneNumber, Double amount){
        Vector vector = vectorRepo.getByValue(phoneNumber);


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
}
