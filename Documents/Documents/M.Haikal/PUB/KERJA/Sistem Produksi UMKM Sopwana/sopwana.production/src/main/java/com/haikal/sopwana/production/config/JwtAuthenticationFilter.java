package com.haikal.sopwana.production.config;

import com.haikal.sopwana.production.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    // Nama attribute request tempat menyimpan pekerjaId hasil ekstrak token
    public static final String ATTR_PEKERJA_ID = "pekerjaIdFromToken";

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return HttpMethod.OPTIONS.matches(request.getMethod());
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String token = authHeader.substring(7);

            if (jwtUtil.validateToken(token)) {
                String username = jwtUtil.extractUsername(token);

                if (username != null
                        && SecurityContextHolder.getContext().getAuthentication() == null) {

                    String authority = toAuthority(jwtUtil.extractRole(token));

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    username,
                                    null,
                                    Collections.singletonList(new SimpleGrantedAuthority(authority)));

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    // ──────────────────────────────────────────────────────────
                    // TAMBAHAN BARU:
                    // Simpan pekerjaId dari klaim JWT ke dalam request attribute.
                    //
                    // Controller bisa membacanya dengan:
                    //   Long id = (Long) request.getAttribute(
                    //       JwtAuthenticationFilter.ATTR_PEKERJA_ID);
                    //
                    // Dengan ini controller TIDAK perlu minta pekerjaId dari
                    // body/parameter — otomatis sudah tersedia dari token.
                    // ──────────────────────────────────────────────────────────
                    Long pekerjaId = jwtUtil.extractPekerjaId(token);
                    if (pekerjaId != null) {
                        request.setAttribute(ATTR_PEKERJA_ID, pekerjaId);
                    }
                }
            }

        } catch (Exception e) {
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

    private String toAuthority(String role) {
        if (role == null || role.isBlank()) return "ROLE_PEKERJA";
        role = role.trim().toUpperCase();
        return role.startsWith("ROLE_") ? role : "ROLE_" + role;
    }
}
