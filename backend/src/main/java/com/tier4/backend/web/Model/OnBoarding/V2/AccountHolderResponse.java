package com.tier4.backend.web.Model.OnBoarding.V2;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccountHolderResponse {

    @JsonProperty(namespace = "status")
    private String status;

    @JsonProperty(namespace = "individualID")
    private String individualID;

}
