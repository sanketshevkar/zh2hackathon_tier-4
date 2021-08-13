package com.tier4.backend.Exceptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class VectorException extends RuntimeException {

    public VectorException(String message) {
        super(message);
        log.error(message);
    }
}
