package com.tier4.backend.web.Model.OnBoarding;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccountHolderAppResponse {

    @NotNull
    private String accountHolderID;
}
