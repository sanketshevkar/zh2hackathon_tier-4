package com.tier4.backend.web.Model.Twilio;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SmsRequest {

    private String phoneNumber;
    private String message;
}
