package com.tier4.backend.web.Model.Twilio;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class sendMessage {

    private String phoneNumber;
    private String message;
}
