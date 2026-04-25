package com.takaful.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(SlotUnavailableException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String handleSlotUnavailable(SlotUnavailableException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(DuplicatePhoneException.class)
    public ResponseEntity<?> handleDuplicate(DuplicatePhoneException ex) {
        return ResponseEntity
                .badRequest()
                .body(Map.of("message", ex.getMessage()));
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<?> handleDuplicate(DuplicateResourceException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("message", ex.getMessage()));
    }
}