package com.tier4.backend.web.Model.OnBoarding.Application.Request;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tier4.backend.web.Model.OnBoarding.VectorsDto;
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
public class ApplicationDto {

    //Already present in the user domain model stroed with us while the user signs up
    private String requestID;
    private List<VectorsDto> vectors;
    private sections sections;




//    {
//        "requestID": "request_final_RAHApplication",
//            "firstName": "RAH_1_final",
//            "dob": "2001-04-22T00:00+05:30",
//            "vectors": [
//        {
//            "type": "p",
//                "value": "+919200382301"
//        }
//  ],
//        "kycDetails": {
//        "kycStatus": "AADHAAR_OTP",
//                "kycStatusPostExpiry": "MINIMAL",
//                "authType": "AADHAAR"
//    }
//    }
}
