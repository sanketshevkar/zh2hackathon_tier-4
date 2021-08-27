package com.tier4.backend.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class TwilioConfiguration {

    @Autowired
    private Environment environment;



}
