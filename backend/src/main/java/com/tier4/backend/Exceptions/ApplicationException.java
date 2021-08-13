package com.tier4.backend.Exceptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ApplicationException extends RuntimeException {

    public ApplicationException(String message) {
        super(message);
        log.error(message);
    }
}
