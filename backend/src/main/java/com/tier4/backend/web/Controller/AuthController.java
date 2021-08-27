package com.tier4.backend.web.Controller;
import com.tier4.backend.Repositories.PotRepo;
import com.tier4.backend.Repositories.UserRepo;
import com.tier4.backend.Repositories.VectorRepo;
import com.tier4.backend.Services.AuthService;
import com.tier4.backend.Services.Twilio.SmsSenderImpl;
import com.tier4.backend.web.Domain.PersonalDetails;
import com.tier4.backend.web.Domain.User;
import com.tier4.backend.web.Domain.Vector;
import com.tier4.backend.web.Model.Auth.*;
import com.tier4.backend.web.Model.OnBoarding.Application.Request.dob;
import com.tier4.backend.web.Model.OnBoarding.V2.AccountHolderRequest;
import com.tier4.backend.web.Model.OnBoarding.V2.AccountHolderResponse;
import com.tier4.backend.web.Model.OnBoarding.V2.authData;
import com.tier4.backend.web.Model.OnBoarding.VectorsDto;
import com.tier4.backend.web.Model.OnBoarding.kycDetails;
import com.tier4.backend.web.Model.Twilio.SmsRequest;
import com.tier4.backend.web.Model.Twilio.sendMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
@Slf4j
public class AuthController {

    @Autowired
    private VectorRepo vectorRepo;
    @Autowired
    private AuthService authService;
    @Autowired
    private SmsSenderImpl smsSender;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PotRepo potRepo;



    private Random random = new Random();
    private RestTemplate restTemplate;

    public AuthController(RestTemplateBuilder restTemplateBuilder){
        this.restTemplate = restTemplateBuilder.build();
    }


    @PostMapping("/login")
    public ResponseEntity<UserLoginReponse> login(@RequestBody UserLoginRequest userLoginRequest) throws NullPointerException {

        Vector vector = vectorRepo.getByValue(userLoginRequest.getMobileNumber());
        System.out.println(vector.toString());
        User user = vector.getUser();
        PersonalDetails personalDetails = user.getPersonalDetails();

            return ResponseEntity.ok(UserLoginReponse.builder()
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .phoneNumber(vector.getValue())
                    .build());

    }

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> signUp(@RequestBody UserSignUpRequest userSignUpRequest) throws IOException, InterruptedException {

        log.info(userSignUpRequest.toString());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("VALUE","OK");


            return new ResponseEntity(SignUpResponse.builder().pin(authService.signUp(userSignUpRequest)).build(),httpHeaders,HttpStatus.OK);

    }

    @PostMapping("/number/verification")
    public ResponseEntity verifyPhoneNumber(@RequestParam(name = "phoneNumber") String phoneNumber,@RequestParam("pin") String pin) {
        HttpHeaders httpHeaders = new HttpHeaders();

        if (authService.verifyPhoneNumber(phoneNumber, pin)) {
            httpHeaders.set("STATUS", "VERIFIED");
            return new ResponseEntity(httpHeaders, HttpStatus.OK);
        } else {
            httpHeaders.set("STATUS","NOT-VERIFIED");
            return new ResponseEntity(httpHeaders,HttpStatus.NOT_ACCEPTABLE);
        }
    }


    @PostMapping("/smsTest")
    public String sendSms(@RequestBody sendMessage sendMessage){

        log.info("sending message");
        String id = String.format("%04d", random.nextInt(10000));
        log.info(id);
        smsSender.sendSms(SmsRequest.builder().message(id).phoneNumber(sendMessage.getPhoneNumber()).build());
        log.info("message sent");

        return "DONE";
    }

    @PostMapping("/test1")
    public String test1(@RequestBody UserSignUpRequest userSignUpRequest){

        AccountHolderRequest request = AccountHolderRequest.builder()
                .firstName(userSignUpRequest.getFirstName())
                .lastName(userSignUpRequest.getLastName())
                .applicationType("CREATE_ACCOUNT_HOLDER_01")
                .spoolID("8676732345678908756432")
                .individualType("REAL")
                .dob(dob.builder()
                        .day(userSignUpRequest.getDate())
                        .month(userSignUpRequest.getMonth())
                        .year(userSignUpRequest.getYear())
                        .build())
                .ifiID("140793")
                .kycDetails(kycDetails.builder()
                        .kycStatus("MINIMAL")
                        .kycStatusPostExpiry("KYC_EXPIRED")
                        .authData(authData.builder()
                                .PAN(userSignUpRequest.getPan())
                                .build())
                        .authType("PAN")
                        .build())
                .vectors(new ArrayList<>(List.of(VectorsDto.builder()
                        .type("p")
                        .value(userSignUpRequest.getPhoneNumber())
                        .build())))
                .build();

        log.info("ACCOUNT HOLDER : "+request);
        log.info("SPOOL ID : "+request);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Zeta-AuthToken","eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidGFnIjoiTDdJbDNoZXk3ekpmemVURi1fem9fZyIsImFsZyI6IkExMjhHQ01LVyIsIml2IjoibDQwOS1pb0RBVnZhQXBTbSJ9.nXBYmlt4n_LzukGhXV7uDwdak09oxqtkktlxJPe4Sgs.Md_H2rfZWUUjBnMLNTxkcw.EvsC3uXaVsetmOuvXSxzCnshA7nFvHXzLLHbkLY0TVvdfdX9qocsYQks_iDE4tTLbDGrB5fKrcmIE1QyNNk4gVqqET69PAPuvBWblUCAFq-HDCEPs5d66i-a27fUfKXvxBsHJqFv1NK1AumGsWdP3t2gE4AvON-c_obx2vitY1Bw66G-vh8KybLfYqL0m25YfhMrCIFlF-1BLnTToI6P0EtohXUb_HJeoQyci10JpT6USwFkj8d8c9URhluKjNi00-23-hxc3pyVJkD2rPUhVG3jOr8s4p9LTNPIYs2dmuXc82SQImK7TeA0fns1WBgWeMpkMAezP4c2Ax-PCWXniBe53Ld3JkuOVg2dwbG1GNDs2NTWmdMIB9Xt1t3-N77CFvKxlc8WtjTRXxcMo5KLlg.coQQMan9J6yTqymrEf_4sQ");

        HttpEntity entity = new HttpEntity(request,headers);
        //https://testy.free.beeceptor.com
        //https://fusion.preprod.zeta.in/api/v1/ifi/140793/applications/newIndividual
        ResponseEntity<AccountHolderResponse> response = restTemplate.exchange("https://fusion.preprod.zeta.in/api/v1/ifi/140793/applications/newIndividual",HttpMethod.POST,entity,AccountHolderResponse.class);

        log.info("response : "+response.getBody().toString());
        return "DONE";
    }

    @DeleteMapping("/deleteVector")
    public void deletePhoneNumber(){

        vectorRepo.deleteAll();


    }


}
