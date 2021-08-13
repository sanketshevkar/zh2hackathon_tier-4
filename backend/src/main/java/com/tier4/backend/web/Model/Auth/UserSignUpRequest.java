package com.tier4.backend.web.Model.Auth;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserSignUpRequest {

    private String firstName;
    private String lastName;
    private String type;
    private String phoneNumber;
    private String pin;


}
