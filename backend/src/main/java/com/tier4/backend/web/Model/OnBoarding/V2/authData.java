package com.tier4.backend.web.Model.OnBoarding.V2;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class authData {

    @JsonProperty(namespace = "PAN")
    private String PAN;



}
