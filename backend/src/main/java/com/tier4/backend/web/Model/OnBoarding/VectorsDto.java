package com.tier4.backend.web.Model.OnBoarding;

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
public class VectorsDto {

    private final String type = "p";
    private String value;

    private boolean verified;
    private String aetherId;
}
