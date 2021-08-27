package com.tier4.backend.web.Model.OnBoarding;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import com.tier4.backend.web.Model.OnBoarding.V2.authData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class kycDetails {

    @JsonProperty(namespace = "kycStatus")
    private  String kycStatus = "MINIMAL";

    @JsonProperty(namespace = "kycStatusPostExpiry")
    private  String kycStatusPostExpiry = "KYC_EXPIRED";

    @JsonProperty(namespace = "authData")
    private com.tier4.backend.web.Model.OnBoarding.V2.authData authData;

    @JsonProperty(namespace = "authType")
    private String authType = "PAN";

}
