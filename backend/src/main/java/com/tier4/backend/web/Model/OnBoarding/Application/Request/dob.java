package com.tier4.backend.web.Model.OnBoarding.Application.Request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class dob {

    @JsonProperty(namespace = "year")
    private String year;

    @JsonProperty(namespace = "month")
    private String month;

    @JsonProperty(namespace = "day")
    private String day;

}
