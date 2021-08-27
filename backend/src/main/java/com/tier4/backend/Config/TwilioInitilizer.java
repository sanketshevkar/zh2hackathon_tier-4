package com.tier4.backend.Config;

import com.twilio.Twilio;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
@Slf4j
public class TwilioInitilizer {

    @Autowired
    private Environment environment;

    private static final String accountSID = "AC86d84b5d9e2994d0576a7fe1aaac4687";
    public static final String authToken = "39e4219cf00e8480a7b2d0ce0ac9ad82";
    public static final String phoneNumber = "+17175848038";


    //AC22c5b1d27cbda640996935857736209a
    //18f77bcebae5daf93c9918d6e7eea822
    //+19034379621
    public TwilioInitilizer(){

        log.info("connecting to twilio account_");
        Twilio.init(
               accountSID,authToken
        );
        log.info("connected to twilio");
    }
}
