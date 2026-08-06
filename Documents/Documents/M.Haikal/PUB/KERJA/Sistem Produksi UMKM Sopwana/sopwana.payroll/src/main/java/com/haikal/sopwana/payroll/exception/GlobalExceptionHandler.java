package com.haikal.sopwana.payroll.exception;

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

        body.put("code", HttpStatus.BAD_REQUEST.value());
        body.put("message", "Validasi input gagal");
        body.put("errors", errors);
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(PekerjaNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(PekerjaNotFoundException ex) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("code", HttpStatus.NOT_FOUND.value());
        map.put("message", ex.getMessage());
        return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ExcelParsingException.class)
    public ResponseEntity<Map<String, Object>> handleExcelEror(ExcelParsingException ex) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("code", HttpStatus.UNPROCESSABLE_ENTITY.value());
        map.put("message", ex.getMessage());
        return new ResponseEntity<>(map, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDataIntegrity(DataIntegrityViolationException ex) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("code", HttpStatus.BAD_REQUEST.value());
        map.put("message", "Data tidak valid atau sudah digunakan. Periksa username/email agar tidak duplikat.");
        return ResponseEntity.badRequest().body(map);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException ex) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("code", HttpStatus.BAD_REQUEST.value());
        map.put("message", ex.getMessage());
        return ResponseEntity.badRequest().body(map);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntime(RuntimeException ex) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("code", HttpStatus.BAD_REQUEST.value());
        map.put("message", ex.getMessage());
        return ResponseEntity.badRequest().body(map);
    }
}
