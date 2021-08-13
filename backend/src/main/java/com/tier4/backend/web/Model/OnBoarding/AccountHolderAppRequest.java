package com.tier4.backend.web.Model.OnBoarding;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tier4.backend.web.Model.Headers;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccountHolderAppRequest {

    private AccountHolderHeader headers;
    private Integer ifiID;
    private String formId;
    private String spoolId;
    private String accountHolderType;
    private String firstName;
    private String lastName;
    private String profilePicURL;
    private String dob;
    private String gender;
    private String mothersMaidenName;
    private kycDetails kycDetails;
    private List<VectorsDto> vectors;
    private Pops pops;
    private CustomFields customFields;
    private String source;



//    headers	{...}
//    ifiID	integer ($int64)
//    formID	string
//    spoolID	string
//    required: true
//    description	string
//    required: false
//    accountHolderType	string
//    required: true
//    salutation	string
//    required: false
//    firstName	string
//    required: true
//    middleName	string
//    required: false
//    lastName	string
//    required: true
//    profilePicURL	string
//    required: true
//    dob	string ($date)
//    required: true
//    gender	string
//    required: true
//    mothersMaidenName	string
//    required: true
//    kycDetails	KYCDetails{...}
//    vectors	[...]
//    pops	[...]
//    customFields	{...}
//    tags	[...]
//    source	string


}
