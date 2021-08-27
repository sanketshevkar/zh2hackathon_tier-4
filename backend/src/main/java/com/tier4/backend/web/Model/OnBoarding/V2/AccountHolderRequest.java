package com.tier4.backend.web.Model.OnBoarding.V2;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tier4.backend.web.Domain.Vector;
import com.tier4.backend.web.Model.OnBoarding.Application.Request.dob;
import com.tier4.backend.web.Model.OnBoarding.VectorsDto;
import com.tier4.backend.web.Model.OnBoarding.kycDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccountHolderRequest {

    @JsonProperty(namespace = "ifiID")
    private String ifiID;

    private String applicationType = "CREATE_ACCOUNT_HOLDER_01";

    private String spoolID = "8676732345678908756432";

    private String individualType = "REAL";

    @JsonProperty(namespace = "firstName")
    private String firstName;

    @JsonProperty(namespace = "lastName")
    private String lastName;

    @JsonProperty(namespace = "dob")
    private dob dob;

    @JsonProperty(namespace = "kycDetails")
    private com.tier4.backend.web.Model.OnBoarding.kycDetails kycDetails;

    @JsonProperty(namespace = "vectors")
    private List<VectorsDto> vectors;


}
