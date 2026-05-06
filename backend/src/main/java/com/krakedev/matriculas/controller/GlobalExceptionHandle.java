package com.krakedev.matriculas.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandle {

	 @ExceptionHandler(RuntimeException.class)
	    @ResponseStatus(HttpStatus.BAD_REQUEST)
	    public String handleRuntimeException(RuntimeException ex) {
	        return ex.getMessage();
	    }
	}
