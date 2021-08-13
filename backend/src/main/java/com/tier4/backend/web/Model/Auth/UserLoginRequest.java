package com.tier4.backend.web.Model.Auth;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserLoginRequest {

    @Pattern(regexp = "[0-9]{10}",message = "mobile numbers cannot be more than 10 digits")
    @Size(min = 10,max = 10)
    @NotNull
    private String mobileNumber;

    @Size(max = 4,min = 4,message = "auth pins have to be 4 character long")
    @NotNull
    private String pin;

}
