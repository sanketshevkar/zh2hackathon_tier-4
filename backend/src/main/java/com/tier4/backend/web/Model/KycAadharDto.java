package com.tier4.backend.web.Model;


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
public class KycAadharDto {


    @JsonProperty(namespace = "vboTransactionId")
    private String vboTransactionId;

    @JsonProperty(namespace = "customerName")
    private String customerName;

    @JsonProperty(namespace = "kycType")
    private String kycType;

    @JsonProperty(namespace = "vectorType")
    private String vectorType;

    @JsonProperty(namespace = "vectorValue")
    private String vectorValue;

    @JsonProperty(namespace = "bundleId")
    private String bundleId;

    @JsonProperty(namespace = "attrs")
    private Attrs attrs;

    @JsonProperty(namespace = "headers")
    private Headers headers;



}
