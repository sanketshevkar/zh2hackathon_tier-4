package com.tier4.backend.web.Model.OnBoarding;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Pops {

    //todo instance variables to be decided
    @NotNull
    private String id;

    private String aetherPopID;
    private Integer ifiID;
    private String label;
    private String accountHolderID;
    private AddressDto address;
}

