package com.haikal.sopwana.payroll.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequest {

    @NotBlank(message = "Username wajib diisi")
    @Size(min = 3, max = 50, message = "Username harus 3 sampai 50 karakter")
    private String username;

    @NotBlank(message = "Password wajib diisi")
    @Size(min = 4, max = 100, message = "Password harus 4 sampai 100 karakter")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
