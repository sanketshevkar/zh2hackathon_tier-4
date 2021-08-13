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
public class AddressDto {

    private String line1;
    private String line2;
    private String city;
    private String postCode;
    private String country;
    private double latitute;
    private double longitutde;


}
