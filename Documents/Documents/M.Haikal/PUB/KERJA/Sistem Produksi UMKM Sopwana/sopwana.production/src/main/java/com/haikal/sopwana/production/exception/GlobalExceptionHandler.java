package com.haikal.sopwana.production.exception;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        Map<String, String> errors = new LinkedHashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("message", "Validasi input gagal");
        body.put("errors", errors);
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(StokTidakCukupException.class)
    public ResponseEntity<Map<String, Object>> handleStokTidakCukup(StokTidakCukupException ex) {
        Map<String, Object> errorMap = new LinkedHashMap<>();
        errorMap.put("status", HttpStatus.BAD_REQUEST.value());
        errorMap.put("message", ex.getMessage());
        return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDataIntegrity(DataIntegrityViolationException ex) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", HttpStatus.BAD_REQUEST.value());
        map.put("message", "Data tidak valid atau melanggar aturan database.");
        return ResponseEntity.badRequest().body(map);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException ex) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", HttpStatus.BAD_REQUEST.value());
        map.put("message", ex.getMessage());
        return ResponseEntity.badRequest().body(map);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntime(RuntimeException ex) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", HttpStatus.BAD_REQUEST.value());
        map.put("message", ex.getMessage());
        return ResponseEntity.badRequest().body(map);
    }
}
