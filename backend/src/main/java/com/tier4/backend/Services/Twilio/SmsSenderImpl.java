package com.tier4.backend.Services.Twilio;

import com.tier4.backend.Config.TwilioInitilizer;
import com.tier4.backend.web.Model.Twilio.SmsRequest;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.api.v2010.account.MessageCreator;
import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Service;

@Service
public class SmsSenderImpl implements SmsSender {


    @Override
    public void sendSms(SmsRequest smsRequest) {

        PhoneNumber to = new PhoneNumber(smsRequest.getPhoneNumber());
        PhoneNumber from = new PhoneNumber(TwilioInitilizer.phoneNumber);
        String message = smsRequest.getMessage();

        MessageCreator creator = Message.creator(to, from, message);
        creator.create();

    }

}
