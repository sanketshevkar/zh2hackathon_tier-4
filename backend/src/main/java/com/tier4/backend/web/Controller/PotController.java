package com.tier4.backend.web.Controller;


import com.tier4.backend.BootStrap.MarketPlace;
import com.tier4.backend.Services.PotService;
import com.tier4.backend.web.Model.Misselleaneous.PredictionMessage;
import com.tier4.backend.web.Model.Pot.PotDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pot")
@RequiredArgsConstructor
public class PotController {

    private final PotService potService;

    @PostMapping("/create")
    public ResponseEntity<?> createPot(@RequestBody PotDto potDto, @RequestParam(required = true) boolean forcedCreate){


        System.out.println(potDto.toString());
        if(forcedCreate == false){
            PredictionMessage message = potService.predictViability(potDto);
            System.out.println(message);
            return new ResponseEntity(message,HttpStatus.OK) ;
        }
        else{

            return new ResponseEntity(potService.createPot(potDto),HttpStatus.OK);
        }

    }

    @PutMapping("/update/{potId}")
    public ResponseEntity<?> createPot(@RequestBody PotDto potDto, @PathVariable Long potId){

        potService.updatePot(potId,potDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{potId}")
    public ResponseEntity<?> retransferPotFunds(@PathVariable Long potId){

        return new ResponseEntity<>(potService.deletePot(potId),HttpStatus.OK);
    }

    @GetMapping("/details/all/{phoneNumber}")
    public ResponseEntity<List<PotDto>> getAllUserPotDetails(@PathVariable String phoneNumber){

        return new ResponseEntity(potService.getAllPots(phoneNumber),HttpStatus.OK);
    }

    @GetMapping("/details/{potId}")
    public ResponseEntity<?> getPotDetails(@PathVariable Long potId){

        return new ResponseEntity(potService.getPotDetails(potId), HttpStatus.OK);
    }


    @GetMapping("/marketPlace")
    public ResponseEntity<List<PotDto>> marketPlace(){

        return new ResponseEntity(MarketPlace.marketPlacePot,HttpStatus.OK);
    }


}
