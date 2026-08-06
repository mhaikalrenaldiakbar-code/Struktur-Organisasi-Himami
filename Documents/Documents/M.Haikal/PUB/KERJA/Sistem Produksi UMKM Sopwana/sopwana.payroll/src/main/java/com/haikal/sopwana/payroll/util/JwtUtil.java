package com.haikal.sopwana.payroll.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "RahasiaSistemInformasiUKMKerupukSopwanaBandungHaikalManajemenInformatika";
    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // ─────────────────────────────────────────────────────────────
    // PERBAIKAN UTAMA:
    // generateToken sekarang menerima pekerjaId dan menanamnya
    // ke dalam klaim JWT dengan key "pekerja_id".
    // Dengan ini, SETIAP SERVICE bisa tahu pekerjaId langsung
    // dari token tanpa perlu query ke database lagi.
    // ─────────────────────────────────────────────────────────────
    public String generateToken(String username, String role, Long pekerjaId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);

        // Hanya tanam jika ada (PEKERJA punya id, PEMILIK/ADMIN tidak)
        if (pekerjaId != null) {
            claims.put("pekerja_id", pekerjaId);
        }

        return createToken(claims, username);
    }

    // Overload backward-compatible supaya tidak ada error di tempat lain
    public String generateToken(String username, String role) {
        return generateToken(username, role, null);
    }

    // ─── Ekstrak klaim ────────────────────────────────────────────
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    /**
     * Ekstrak pekerjaId dari JWT.
     * Return null bila tidak ada (misal token PEMILIK/ADMIN).
     */
    public Long extractPekerjaId(String token) {
        Object raw = extractAllClaims(token).get("pekerja_id");
        if (raw == null)            return null;
        if (raw instanceof Long)    return (Long) raw;
        if (raw instanceof Integer) return ((Integer) raw).longValue();
        if (raw instanceof Number)  return ((Number) raw).longValue();
        try { return Long.parseLong(raw.toString()); } catch (Exception e) { return null; }
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        return resolver.apply(extractAllClaims(token));
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Boolean validateToken(String token, String username) {
        return extractUsername(token).equals(username) && !isTokenExpired(token);
    }

    private Boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 10))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
