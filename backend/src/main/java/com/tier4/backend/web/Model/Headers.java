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
public class Headers {

    @JsonProperty(namespace = "signatoryJID")
    private String signatoryJID;

    @JsonProperty(namespace = "signature")
    private String signature;

}
