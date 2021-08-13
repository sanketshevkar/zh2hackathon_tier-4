package com.tier4.backend.web.Model.Pot;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import javax.validation.constraints.Pattern;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PotDto {

    private Long id;
    private String title;
    private String description;
    private Double currentAmount;
    private Double amount;
    private String remainingTime;
    // {mm/dd/hh} format

    //@Pattern(regexp = "[1-9]{0,2}/[1-9]{0,2}/[1-9]{1,2}")
    private String eta;
    private boolean autoDeduct;
    private Double weight;
    private String phoneNumber;
    private String imageLink;
}
