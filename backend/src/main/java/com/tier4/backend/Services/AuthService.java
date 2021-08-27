package com.tier4.backend.Services;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.tier4.backend.Exceptions.VectorException;
import com.tier4.backend.Repositories.UserRepo;
import com.tier4.backend.Repositories.VectorRepo;
import com.tier4.backend.Services.Twilio.SmsSenderImpl;
import com.tier4.backend.web.Domain.User;
import com.tier4.backend.web.Domain.Vector;
import com.tier4.backend.web.Model.Auth.UserSignUpRequest;
import com.tier4.backend.web.Model.OnBoarding.Application.Request.dob;
import com.tier4.backend.web.Model.OnBoarding.V2.*;
import com.tier4.backend.web.Model.OnBoarding.VectorsDto;
import com.tier4.backend.web.Model.OnBoarding.kycDetails;
import com.tier4.backend.web.Model.Twilio.SmsRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;
import java.util.*;
import java.net.http.HttpRequest;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private  VectorRepo vectorRepo;

    @Autowired
    private  UserRepo userRepo;

    @Autowired
    private Environment environment;

    @Autowired
    private SmsSenderImpl smsSender;

    private RestTemplate restTemplate;

    private Random random = new Random();

    public AuthService(RestTemplateBuilder templateBuilder){
        this.restTemplate = templateBuilder.build();
    }

    @Transactional
    public Vector getVectorByValue(String value) {

        return vectorRepo.getByValue(value);
    }

    @Transactional
    public String signUp(UserSignUpRequest userSignUpRequest) throws IOException, InterruptedException {

        Vector vector = Vector.builder()
                .type("p")
                .value(userSignUpRequest.getPhoneNumber())
                .leftOver("0.0")
                .prevAvg("0.0")
                .totalDays(0.0)
                .build();

       vector = vectorRepo.save(vector);

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
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity entity = new HttpEntity(request,headers);


        ResponseEntity<AccountHolderResponse> response = restTemplate.exchange("https://fusion.preprod.zeta.in/api/v1/ifi/140793/applications/newIndividual",HttpMethod.POST,entity,AccountHolderResponse.class);
        log.info("account holder response: "+response.getBody().toString());
        //TWILIO AUTH
        String id = String.format("%04d", random.nextInt(10000));
        log.info("id :: "+id);

        smsSender.sendSms(SmsRequest.builder().phoneNumber(userSignUpRequest.getPhoneNumber()).message(id).build());

        HttpHeaders headers1 = new HttpHeaders();

        BundleIssuanceRequest request1 = BundleIssuanceRequest
                .builder()
                .accountHolderID(response.getBody().getIndividualID())
                .name("VBO_RANDOM_V1")
                .phoneNumber(userSignUpRequest.getPhoneNumber())
                .build();

        HttpEntity entity1 = new HttpEntity(request1,headers1);
        //restTemplate.exchange("https://fusion.preprod.zeta.in/api/v1/ifi/140793/bundles/ed58a3f6-13ae-4c60-b0ea-9bfaddaf90f1/issueBundle", HttpMethod.POST, entity1, new ParameterizedTypeReference<Object>() {});

        log.info("STRING TYPE VALUE :"+new ObjectMapper().writeValueAsString(request1).toString());

        HttpRequest req = HttpRequest.newBuilder().uri(URI.create("https://fusion.preprod.zeta.in/api/v1/ifi/140793/bundles/ed58a3f6-13ae-4c60-b0ea-9bfaddaf90f1/issueBundle"))
                .POST(HttpRequest.BodyPublishers.ofString(new ObjectMapper().writeValueAsString(request1))).build();

        HttpClient client = HttpClient.newHttpClient();

        HttpResponse res = client.send(req, HttpResponse.BodyHandlers.ofString());

        log.info("status of 2nd call "+res.statusCode());


        HttpHeaders headers2 = new HttpHeaders();
        headers2.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity httpEntity2 = new HttpEntity(null,headers);

        AccountResultant response2 = restTemplate.exchange("https://fusion.preprod.zeta.in/api/v1/ifi/140793/individuals/" + response.getBody().getIndividualID() + "/accounts", HttpMethod.GET, httpEntity2, new ParameterizedTypeReference<AccountResultant>(){}).getBody();
        log.info("Account List :"+ response2.toString());


        vector.setIndividualID(response.getBody().getIndividualID());
        vector.setTwilioToken(id);
        vector.setAccountID(response2.getAccounts().get(0).getId());
        vector = vectorRepo.save(vector);
        System.out.println(vector.toString());

        User user = User.builder()
                .firstName(userSignUpRequest.getFirstName())
                .lastName(userSignUpRequest.getLastName())
                .pin("sample")
                .isVerified(false)
                .build();

        user = userRepo.save(user);
        System.out.println(user.toString());

        //user.setVector(vector);
        vector.setUser(user);
        userRepo.save(user);
        vectorRepo.save(vector);

        return id;
    }


    public boolean verifyPhoneNumber(String phoneNumber, String pin) {

        Vector vector = vectorRepo.getByValue(phoneNumber);

        if(vector.getTwilioToken() == pin){
            User user = vector.getUser();
            user.setVerified(true);
            userRepo.save(user);
            return true;
        }else {
            return false;
        }

    }
}
