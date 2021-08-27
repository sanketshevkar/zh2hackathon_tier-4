package com.tier4.backend.web.Controller;

import com.tier4.backend.Services.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/transact")
@Slf4j
public class TransactionController {

    public final TransactionService transactionService;

    @PostMapping("/deduct")
    public ResponseEntity deduceMoney(@RequestParam(required = true,name = "phoneNumber") String phoneNumber
                                     ,@RequestParam(required = true,name = "amount") Double amount){

        log.info("inside deduct api "+phoneNumber+" amount: "+amount);
        return new ResponseEntity(transactionService.calcMultipliedVal(amount,"+"+phoneNumber), HttpStatus.OK);
    }

    @PostMapping("/re-deduct")
    public ResponseEntity redeductMoney(@RequestParam(required = true,name = "phoneNumber") String phoneNumber
            ,@RequestParam(required = true,name = "potId") Long potId ){

        log.info("inside deduct api "+phoneNumber+" amount: "+potId);
        return new ResponseEntity(transactionService.recalcMultipliedVal(potId,"+"+phoneNumber), HttpStatus.OK);
    }


    @PostMapping("/setMultiplier")
    public ResponseEntity<?> setUserMultiplier(@RequestParam(required = true,name = "multiplier") int multiplier
            , @RequestParam(required = true,name = "phoneNumber") String phoneNumber){

        return new ResponseEntity<>("SAVED",HttpStatus.OK);
    }


    @GetMapping("/getMultiplier")
    public ResponseEntity<?> getUserMultiplier(@RequestParam(required = true,name = "phoneNumber") String phoneNumner){

        return new ResponseEntity<>(transactionService.getUserMultiplier(phoneNumner),HttpStatus.OK);
    }

    


}
