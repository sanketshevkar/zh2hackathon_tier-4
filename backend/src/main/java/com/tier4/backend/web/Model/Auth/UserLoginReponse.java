package com.tier4.backend.web.Model.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserLoginReponse {

    private String firstName;
    private String lastName;
    private String phoneNumber;
}
