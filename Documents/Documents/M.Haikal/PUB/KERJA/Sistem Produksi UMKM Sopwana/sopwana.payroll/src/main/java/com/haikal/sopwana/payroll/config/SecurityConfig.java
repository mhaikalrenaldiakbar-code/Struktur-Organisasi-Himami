package com.haikal.sopwana.payroll.config;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;

    /*
     * CATATAN:
     * Ini tetap memakai MD5 karena mengikuti kode kamu yang sekarang.
     * Kalau nanti mau lebih aman, sebaiknya diganti ke BCryptPasswordEncoder.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new PasswordEncoder() {

            @Override
            public String encode(CharSequence rawPassword) {
                return convertToMd5(rawPassword.toString());
            }

            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                return convertToMd5(rawPassword.toString()).equals(encodedPassword);
            }

            private String convertToMd5(String input) {
                try {
                    MessageDigest md = MessageDigest.getInstance("MD5");
                    byte[] messageDigest = md.digest(input.getBytes());
                    StringBuilder hexString = new StringBuilder();

                    for (byte b : messageDigest) {
                        String hex = Integer.toHexString(0xff & b);

                        if (hex.length() == 1) {
                            hexString.append('0');
                        }

                        hexString.append(hex);
                    }

                    return hexString.toString();

                } catch (NoSuchAlgorithmException e) {
                    throw new RuntimeException("Format MD5 tidak didukung di sistem", e);
                }
            }
        };
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // Supaya frontend HTML/JS tidak kena CORS preflight error
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // =========================
                        // ENDPOINT TERBUKA
                        // =========================

                        // Login boleh tanpa token
                        .requestMatchers("/api/payroll/auth/login").permitAll()

                        // Dipanggil internal oleh Production Service saat hasil kemas VALID.
                        // Dibuka agar RestTemplate dari service production tidak terkena 403.
                        .requestMatchers(HttpMethod.POST, "/api/payroll/transaksi/upload").permitAll()

                        // =========================
                        // AKSES PEMILIK / ADMIN
                        // =========================

                        // Register pekerja hanya boleh dilakukan Pemilik/Admin
                        .requestMatchers("/api/payroll/auth/register")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        // Dashboard pekerja boleh mengambil data id_pekerja miliknya sendiri
                        .requestMatchers(HttpMethod.GET, "/api/payroll/pekerja/me")
                        .hasAnyRole("PEKERJA", "ADMIN", "PEMILIK")

                        // Kelola data pekerja hanya Pemilik/Admin
                        .requestMatchers("/api/payroll/pekerja/**")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        // Hitung gaji, bayar gaji, export laporan hanya Pemilik/Admin
                        .requestMatchers("/api/payroll/gaji/**")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        // Testing email slip gaji hanya Pemilik/Admin
                        .requestMatchers("/api/payroll/email/**")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        // Endpoint bayar mingguan untuk flow baru kamu
                        .requestMatchers("/api/payroll/transaksi/bayar-mingguan/**")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        // Endpoint melihat semua transaksi, rekap, audit pending
                        .requestMatchers("/api/payroll/transaksi/semua")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        .requestMatchers(HttpMethod.GET, "/api/payroll/transaksi/pending")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        .requestMatchers(HttpMethod.PUT, "/api/payroll/transaksi/testing/munculkan-gaji")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        .requestMatchers("/api/payroll/transaksi/rekap/**")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        .requestMatchers(HttpMethod.GET, "/api/payroll/transaksi/rekap-mingguan")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        // =========================
                        // AKSES PEKERJA + ADMIN/PEMILIK
                        // =========================

                        // Pekerja boleh lihat transaksi miliknya sendiri,
                        // Pemilik/Admin juga boleh
                        .requestMatchers("/api/payroll/transaksi/pekerja/**")
                        .hasAnyRole("PEKERJA", "ADMIN", "PEMILIK")

                        .requestMatchers(HttpMethod.GET, "/api/payroll/transaksi/riwayat-mingguan/pekerja/**")
                        .hasAnyRole("PEKERJA", "ADMIN", "PEMILIK")

                        // Endpoint lain wajib login
                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // Untuk frontend HTML/CSS/JS biasa
        config.setAllowedOriginPatterns(Arrays.asList(
                "http://localhost:5173",
                "http://localhost:3000",
                "http://127.0.0.1:5500",
                "http://localhost:5500",
                "null",
                "http://127.0.0.1:*",
                "http://localhost:*",
                "http://10.*:*",
                "http://172.*:*",
                "http://192.168.*:*",
                "https://*.devtunnels.ms"));

        config.setAllowedMethods(Arrays.asList(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"));

        config.setAllowedHeaders(Arrays.asList(
                "Authorization",
                "Content-Type",
                "Accept",
                "Origin"));

        config.setExposedHeaders(Arrays.asList(
                "Authorization"));

        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}