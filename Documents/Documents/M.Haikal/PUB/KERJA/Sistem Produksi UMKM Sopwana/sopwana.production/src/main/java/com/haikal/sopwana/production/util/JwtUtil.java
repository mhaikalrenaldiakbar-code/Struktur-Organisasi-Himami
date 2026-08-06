package com.haikal.sopwana.production.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    // Secret key HARUS sama persis dengan yang di payroll-service
    private final String SECRET_KEY = "RahasiaSistemInformasiUKMKerupukSopwanaBandungHaikalManajemenInformatika";
    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    // ─────────────────────────────────────────────────────────────
    // TAMBAHAN BARU:
    // extractPekerjaId() — baca klaim "pekerja_id" dari token JWT
    // yang sudah ditanam oleh payroll-service saat login.
    //
    // Production-service bisa memanggil ini untuk tahu pekerjaId
    // siapa yang sedang mengirim request, TANPA perlu parameter
    // pekerjaId dikirim ulang dari frontend.
    // ─────────────────────────────────────────────────────────────
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

    public Boolean validateToken(String token) {
        try { return !isTokenExpired(token); } catch (Exception e) { return false; }
    }

    public Boolean validateToken(String token, String username) {
        return extractUsername(token).equals(username) && !isTokenExpired(token);
    }

    private Boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    public String getUsernameFromToken(String token) {
        return extractUsername(token);
    }
}
