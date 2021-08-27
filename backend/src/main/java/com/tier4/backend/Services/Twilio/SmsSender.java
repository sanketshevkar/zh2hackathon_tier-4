package com.tier4.backend.Services.Twilio;

import com.tier4.backend.web.Model.Twilio.SmsRequest;

public interface SmsSender {

    void sendSms(SmsRequest smsRequest);
}
