package com.tier4.backend.Services;

import com.tier4.backend.Repositories.ApplicationRepo;
import com.tier4.backend.Utils.Converter;
import com.tier4.backend.web.Domain.Application;
import com.tier4.backend.web.Model.OnBoarding.Application.Request.ApplicationDto;
import com.tier4.backend.web.Model.OnBoarding.Application.Response.ApplicationResponse;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Optional;

@Service
public class ZetaService {

    private RestTemplate restTemplate;
    private final Converter converter;
    private final ApplicationRepo applicationRepo;

    public ZetaService(RestTemplateBuilder restTemplateBuilder, Converter converter, ApplicationRepo applicationRepo){
        this.applicationRepo = applicationRepo;
        this.converter = converter;
        this.restTemplate = restTemplateBuilder.build();
    }

    public ApplicationResponse createNewApplication(ApplicationDto applicationDto){
        HttpEntity entity = new HttpEntity(applicationDto);

        return restTemplate.exchange(URI.create("http://example.com/api/v1/ifi/140827/spool/{{spoolid}}/application"), HttpMethod.POST,entity,new ParameterizedTypeReference<ApplicationResponse>(){}).getBody();
    }


    public void saveApplication(Application application,Integer applicationId){

        application.setApplicationId(applicationId);

       Optional<Application> application1 = Optional.of(applicationRepo.save(application));

    }

    public void createNewAccountHolder(){

    }
}
