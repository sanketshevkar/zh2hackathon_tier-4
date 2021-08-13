package com.tier4.backend.web.Controller;


import com.tier4.backend.Exceptions.ApplicationException;
import com.tier4.backend.Services.ZetaService;
import com.tier4.backend.Utils.Converter;
import com.tier4.backend.web.Model.OnBoarding.Application.Request.ApplicationDto;
import com.tier4.backend.web.Model.OnBoarding.Application.Response.ApplicationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/kyc")
@Slf4j
@RequiredArgsConstructor
public class KYCController {

    private final ZetaService ZetaService;
    private final Converter converter;

    @PostMapping("/new/Application")
    public ResponseEntity<Integer> newApplication(@RequestBody ApplicationDto applicationDto){

        //todo handle the missing fields if any in the application object

       ApplicationResponse applicationId  = ZetaService.createNewApplication(applicationDto);

//        applicationId.id-> ZetaService.saveApplication(converter.ApplicationDtoToEntity(applicationDto),id)
//                ,()-> new ApplicationException("ERROR SUBMITTING NEW FORM"));

        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @PostMapping("/new/indivisual/application")
//    public ResponseEntity<String> generateIndiApplication(@RequestBody AccountHolderAppRequest accountHolderAppRequest){
//
//
//
//    }
}
