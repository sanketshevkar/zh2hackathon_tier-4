package com.tier4.backend.web.Model.OnBoarding.V2;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class BundleIssuanceRequest implements Serializable {

    private static Long longId = 10000007L;
    private String accountHolderID;
    private String name;
    private String phoneNumber;

}
