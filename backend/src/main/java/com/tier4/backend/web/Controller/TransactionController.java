package com.tier4.backend.web.Controller;

import com.tier4.backend.Services.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/transact")
public class TransactionController {

    public final TransactionService transactionService;

    @PostMapping("/deduct")
    public ResponseEntity deduceMoney(@RequestParam(required = true,name = "phoneNumber") String phoneNumber
                                     ,@RequestParam(required = true,name = "amount") Double amount){

        return new ResponseEntity(transactionService.distributeMoneyToPots(phoneNumber, amount), HttpStatus.OK);
    }


    


}
