package com.tier4.backend.web.Model.OnBoarding.Application.Request;


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
public class AccountHolderDetails {

    private String name;
    private String type;
    private details details;
    private String salutation;
    private String firstName;
    private String lastName;
    private String middleName;
    private String profilePicURL;
    //possible enum
    private String applicationType;
    //possible enum
    private String gender;
    private String mothersMaidenName;

}
