package com.tier4.backend.Services;

import com.tier4.backend.Repositories.PotRepo;
import com.tier4.backend.Repositories.UserRepo;
import com.tier4.backend.Repositories.VectorRepo;
import com.tier4.backend.Utils.Converter;
import com.tier4.backend.web.Domain.Pot;
import com.tier4.backend.web.Domain.User;
import com.tier4.backend.web.Domain.Vector;
import com.tier4.backend.web.Model.Misselleaneous.PredictionMessage;
import com.tier4.backend.web.Model.Pot.PotDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ConcurrentModel;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.OptionalDouble;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


@Service
@Slf4j
public class PotService {

    @Autowired
    private VectorRepo vectorRepo;

    @Autowired
    private PotRepo potRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private Converter converter;

    @Transactional
    public List<PotDto> createPot(PotDto potDto) {

        Vector vector = vectorRepo.getByValue(potDto.getPhoneNumber());

        User user = vector.getUser();

        if(user.getPot() == null){
            user.setPot(new ArrayList<>());
        }

        List<Pot> potList = user.getPot();

        Pot pot = Pot.builder()
                .title(potDto.getTitle())
                .amount(potDto.getAmount())
                .currentAmount(0.0)
                .description(potDto.getDescription())
                .autoDeduct(true)
                .totalTime(potDto.getEta())
                .timeLeft(potDto.getEta())
                .weight(potDto.getWeight())
                .imageLink(potDto.getImageLink())
                .build();


        pot.setUser(user);
        pot = potRepo.save(pot);

        user.getPot().add(pot);
        user = userRepo.save(user);

        List<Pot> pots = weightOptimizer(user.getPot());
        potRepo.saveAll(pots);
        user.setPot(pots);
        userRepo.save(user);

        return vectorRepo.getByValue(potDto.getPhoneNumber()).getUser().getPot().stream().map(Converter::potToPotDto).collect(Collectors.toList());

    }

    @Transactional
    public PotDto deletePot(Long potId){

        Pot pot = potRepo.getById(potId);
        User user = pot.getUser();
        double currentAmount = pot.getCurrentAmount();

        user.getPot().remove(pot);
        potRepo.delete(pot);

        List<Pot> pots = weightOptimizer(user.getPot());
        potRepo.saveAll(pots);
        user.setPot(pots);
        userRepo.save(user);

        return converter.potToPotDto(pot);
    }

    @Transactional(readOnly = true)
    public PotDto getPotDetails(Long potId){

        return converter.potToPotDto(potRepo.getById(potId));
    }

    @Transactional
    public void updatePot(Long potId,PotDto potDto) {

        Pot pot = potRepo.getById(potId);
        pot.setAmount(potDto.getAmount());
        pot.setTotalTime(potDto.getEta());
        pot.setTimeLeft(Double.toString(Double.parseDouble(pot.getTimeLeft())+Double.parseDouble(potDto.getEta())));
        User user = pot.getUser();

        for(int i = 0;i<user.getPot().size();i++){
            if(user.getPot().get(i).getId() == potId)
                user.getPot().set(i,pot);
        }

        potRepo.save(pot);
        userRepo.save(user);
    }

    public static List<Pot> weightOptimizer(List<Pot> pots){

        pots.forEach(System.out::println);

        List<Double> weightRatio = pots.stream().sequential()
                                    .map(pot -> {
                                        double timeLeft = Double.parseDouble(pot.getTimeLeft());
                                        double totalTime = Double.parseDouble(pot.getTotalTime());
                                        double totalAmount = pot.getAmount();
                                        double currentAmount = pot.getCurrentAmount();

                                        if(timeLeft == 0)
                                            return 0.0;

                                        return ((totalAmount-currentAmount) * totalTime)/ Math.pow(timeLeft,3)*totalAmount;

                                    }).collect(Collectors.toList());

        double weightSum = weightRatio.stream()
                            .filter(weight-> weight != Double.NaN)
                            .mapToDouble(weight->weight)
                            .sum();


        weightRatio = weightRatio.stream().sequential()
                .map(weight->weight/weightSum)
                .collect(Collectors.toList());

        for(int i =0 ;i<pots.size();i++)
            pots.get(i).setWeight(weightRatio.get(i));


        return pots;

    }

   public static ArrayList predictEval(List<Double> amounts, List<Double> times,Double UserAvg) {

    Double carryMoney = 0.0;
    Double todaysMoney = 0.0;
    Double potMoney = 0.0;
    Double req;

    Set<Double> toBeRemoved = new HashSet();
    List<Double> currentAmounts =  new ArrayList<>(Arrays.asList(new Double[amounts.size()]));
    Collections.fill(currentAmounts, 0.0);
    List<Double> payedDetails = new ArrayList<>(Arrays.asList(new Double[amounts.size()]));
    Collections.fill(payedDetails, 0.0);
    List<Double> amountLeft =  new ArrayList<>(Arrays.asList(new Double[amounts.size()]));
    Collections.fill(amountLeft, 0.0);
    List<Double> timeLeft =  new ArrayList<>(Arrays.asList(new Double[amounts.size()]));
    Collections.fill(timeLeft, 0.0);
    List<Double> weights =  new ArrayList<>();




    OptionalDouble maxTimeRemaining = times.stream()
                              .mapToDouble(time->time)
                              .max();
    
    
    for(double i = 0;i<maxTimeRemaining.getAsDouble();i++){

        todaysMoney = UserAvg + carryMoney;
        carryMoney = 0.0;
        
        for(int j=0;j<amounts.size();j++){
            
            amountLeft.set(j, amounts.get(j) - currentAmounts.get(j));
            timeLeft.set(j,times.get(j) - i);
        }

        for(int j =0;j<amountLeft.size();j++){

            if(amountLeft.get(j) == 0 & toBeRemoved.contains(j) == false){
                payedDetails.set(j,i);
                toBeRemoved.add((double)j);
            }

            else if(timeLeft.get(j) == 0 & toBeRemoved.contains(j) == false){
                toBeRemoved.add((double)j);
            }

        }

        if(toBeRemoved.size() == amountLeft.size())
            break;

        
       for(int k = 0;k<timeLeft.size();k++) {

           if (timeLeft.get(k) > 0) {
               weights.add(amountLeft.get(k) * times.get(k) / Math.pow(timeLeft.get(k), 3) * amounts.get(k));
           } else {
               weights.add(0.0);
           }
       }

       double weightSum = weights.stream()
        .mapToDouble(weight->weight)
        .sum();


        List<Double> newWeights = weights.stream().sequential()
        .map(weight->weight/weightSum)
        .collect(Collectors.toList());



        for(int a = 0; a<weights.size();a++){
            potMoney = todaysMoney - newWeights.get(a);
            req = amounts.get(a) - currentAmounts.get(a);
            carryMoney += Math.max(0,potMoney - req);
            currentAmounts.set(a, currentAmounts.get(a)+Math.min(req,potMoney));
        }

        weights = new ArrayList<>();

    }
        return new ArrayList(payedDetails);
   }

    public PredictionMessage predictViability(PotDto potDto) {

        Vector vector = vectorRepo.getByValue(potDto.getPhoneNumber());

        if(Double.parseDouble(vector.getPrevAvg())*Double.parseDouble(potDto.getEta()) < potDto.getAmount())
            return PredictionMessage.builder().value(false).days("0").message("NOT-ABLE").build();

        List<Pot> potList = vector.getUser().getPot();

        List<Double> amounts = potList.stream()
                .map(pot->pot.getAmount() - pot.getCurrentAmount())
                .collect(Collectors.toList());

        List<Double> times = potList.stream()
                .map(pot->Double.parseDouble(pot.getTimeLeft()))
                .collect(Collectors.toList());

        List<Double> amountsCopy = new ArrayList<>(amounts);
        List<Double> timesCopy = new ArrayList<>(times);

        List<Double> result1 = predictEval(amounts,times,Double.parseDouble(vector.getPrevAvg()));

        amountsCopy.add(potDto.getAmount());
        timesCopy.add(Double.parseDouble(potDto.getEta()));

        List<Double> result2 =  predictEval(amountsCopy,timesCopy,Double.parseDouble(vector.getPrevAvg()));


        long result2Count = result2.stream()
                            .filter(val-> val == 0.0)
                            .count();

        OptionalDouble resultDaysCount1 = result2.stream().mapToDouble(val->val).max();
        OptionalDouble resultDaysCount2 = result1.stream().mapToDouble(val->val).max();
        Double resultDaysCount = Math.abs(resultDaysCount2.getAsDouble() - resultDaysCount1.getAsDouble());



        if(result2Count != 0)
            return PredictionMessage.builder().days("0").value(false).message("By adding the new pot," + result2Count + " pots are not being filled according to the schedule at the current rate of amount being credited").build();
        else
            return PredictionMessage.builder().value(true).days(resultDaysCount.toString()).message("DO-ABLE").build();

    }

    public List<PotDto> getAllPots(String phoneNumber) {


        return vectorRepo.getByValue(phoneNumber).getUser().getPot().stream()
                                                .map(Converter::potToPotDto)
                                                .collect(Collectors.toList());
    }
}

