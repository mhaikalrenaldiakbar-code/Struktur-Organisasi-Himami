package com.haikal.sopwana.payroll.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class PekerjaDto {

    @NotBlank(message = "Username wajib diisi")
    @Size(min = 3, max = 50, message = "Username harus 3 sampai 50 karakter")
    @Pattern(regexp = "^[A-Za-z0-9._-]+$", message = "Username hanya boleh huruf, angka, titik, underscore, atau strip")
    private String username;

    @NotBlank(message = "Password wajib diisi")
    @Size(min = 4, max = 100, message = "Password harus 4 sampai 100 karakter")
    private String password;

    @NotBlank(message = "Nama wajib diisi")
    @Size(min = 3, max = 100, message = "Nama harus 3 sampai 100 karakter")
    @Pattern(regexp = "^[A-Za-zÀ-ÿ\\s'.-]+$", message = "Nama hanya boleh huruf, spasi, titik, petik, atau strip")
    private String nama;

    @NotBlank(message = "Email wajib diisi")
    @Size(max = 100, message = "Email maksimal 100 karakter")
    @Email(message = "Format email tidak valid")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", message = "Format email tidak valid. Email wajib memakai @ dan domain, contoh: nama@gmail.com")
    private String email;

    @Size(max = 255, message = "Alamat maksimal 255 karakter")
    private String alamat;

    @NotBlank(message = "No HP wajib diisi")
    @Pattern(regexp = "^08[0-9]{8,13}$", message = "No HP harus diawali 08 dan berisi 10 sampai 15 digit angka")
    private String noHp;

    @NotBlank(message = "Role wajib diisi")
    @Pattern(regexp = "^(PEMILIK|PEKERJA|ADMIN|ROLE_PEMILIK|ROLE_PEKERJA|ROLE_ADMIN)$", message = "Role hanya boleh PEMILIK, PEKERJA, atau ADMIN")
    private String role;

    public PekerjaDto() {
    }

    public PekerjaDto(String username, String password, String nama, String email, String alamat, String noHp,
            String role) {
        this.username = username;
        this.password = password;
        this.nama = nama;
        this.email = email;
        this.alamat = alamat;
        this.noHp = noHp;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama == null ? null : nama.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat == null ? null : alamat.trim();
    }

    public String getNoHp() {
        return noHp;
    }

    public void setNoHp(String noHp) {
        this.noHp = noHp == null ? null : noHp.trim();
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role == null ? null : role.trim().replace("ROLE_", "");
    }
}