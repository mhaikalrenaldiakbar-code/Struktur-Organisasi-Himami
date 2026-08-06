package com.haikal.sopwana.payroll.dto;

public class JwtResponse {
    private String token;
    private String username;
    private String role;
    private Long pekerjaId;
    private Long idUser;

    public JwtResponse(String token, String username, String role) {
        this(token, username, role, null, null);
    }

    public JwtResponse(String token, String username, String role, Long pekerjaId) {
        this(token, username, role, pekerjaId, null);
    }

    public JwtResponse(String token, String username, String role, Long pekerjaId, Long idUser) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.pekerjaId = pekerjaId;
        this.idUser = idUser;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getPekerjaId() {
        return pekerjaId;
    }

    public void setPekerjaId(Long pekerjaId) {
        this.pekerjaId = pekerjaId;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }
}
