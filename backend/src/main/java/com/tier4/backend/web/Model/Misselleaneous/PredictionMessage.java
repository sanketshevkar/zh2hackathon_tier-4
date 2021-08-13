package com.tier4.backend.web.Model.Misselleaneous;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PredictionMessage {

    boolean value;
    String days;
    String message;
}
