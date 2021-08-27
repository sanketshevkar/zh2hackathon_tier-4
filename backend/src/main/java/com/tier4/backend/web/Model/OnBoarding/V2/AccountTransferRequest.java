package com.tier4.backend.web.Model.OnBoarding.V2;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AccountTransferRequest {

    private Amount amount;
    private String requestID;
    private String transferCode;
    private String debitAccountID;
    private String creditAccountID;
    private String remarks;
    private String transferTime;

}
