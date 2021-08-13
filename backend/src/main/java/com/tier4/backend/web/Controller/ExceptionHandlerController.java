package com.tier4.backend.web.Controller;

import com.tier4.backend.Exceptions.ApiRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerController {

        @ExceptionHandler(value = {NullPointerException.class})
        public ResponseEntity<String> handleNoDataError(){

                return new ResponseEntity("NO::DATA::FOUND"
                                            ,HttpStatus.NO_CONTENT);
        }

}
