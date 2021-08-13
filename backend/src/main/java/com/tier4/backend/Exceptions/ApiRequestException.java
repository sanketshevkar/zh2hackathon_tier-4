package com.tier4.backend.Exceptions;

import lombok.*;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Builder
@Data
public class ApiRequestException {

    private final String message;
    private final HttpStatus httpStatus;

}
