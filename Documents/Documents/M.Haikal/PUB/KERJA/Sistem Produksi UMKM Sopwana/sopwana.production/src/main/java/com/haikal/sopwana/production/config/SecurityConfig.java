package com.haikal.sopwana.production.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth

                        // Supaya request preflight dari frontend HTML/JS tidak diblokir
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // =========================
                        // AKSES PEMILIK / ADMIN
                        // =========================

                        // Pemilik/Admin bisa input produksi atau stok
                        .requestMatchers("/api/production/produksi/**")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        // Pemilik/Admin bisa validasi hasil kerja pekerja
                        .requestMatchers(
                                "/api/production/kerja/validasi/**",
                                "/api/production/kerja/validasi",
                                "/api/production/kerja/hasil/validasi/**",
                                "/api/production/kerja/validasi-hasil/**"
                        )
                        .hasAnyRole("ADMIN", "PEMILIK")

                        // =========================
                        // AKSES PEMILIK, ADMIN, PEKERJA
                        // =========================

                        // Pemilik/Admin full akses, pekerja juga boleh ambil barang
                        .requestMatchers("/api/production/kerja/ambil-barang")
                        .hasAnyRole("ADMIN", "PEMILIK", "PEKERJA")

                        // Pemilik/Admin full akses, pekerja boleh input hasil kemas
                        .requestMatchers("/api/production/kerja/laporkan-kemas")
                        .hasAnyRole("ADMIN", "PEMILIK", "PEKERJA")

                        // Pekerja boleh lihat data kerjanya sendiri,
                        // Pemilik/Admin juga boleh karena akses full
                        .requestMatchers("/api/production/kerja/pekerja/**")
                        .hasAnyRole("ADMIN", "PEMILIK", "PEKERJA")

                        // Pekerja bisa lihat riwayat hasil kerja berdasarkan ID pekerja.
                        // Pemilik/Admin juga bisa karena akses full.
                        .requestMatchers("/api/production/kerja/riwayat/pekerja/**")
                        .hasAnyRole("ADMIN", "PEMILIK", "PEKERJA")

                        // Pemilik/Admin bisa lihat semua riwayat hasil kerja semua pekerja.
                        .requestMatchers("/api/production/kerja/riwayat/**")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        // Semua role boleh lihat stok
                        .requestMatchers("/api/production/stok/**")
                        .hasAnyRole("ADMIN", "PEMILIK", "PEKERJA")

                        // Pemilik/Admin bisa lihat semua penjualan
                        .requestMatchers("/api/production/penjualan/**")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        // Pemilik/Admin bisa mengunduh laporan production
                        .requestMatchers("/api/production/laporan/download-excel/**", "/api/production/laporan/download-excel")
                        .hasAnyRole("ADMIN", "PEMILIK")

                        // Endpoint lain harus login
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // Untuk frontend HTML/JS biasa
        // Kalau kamu buka file HTML langsung dari browser, tambahkan "null" juga
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
                "https://*.devtunnels.ms"
        ));

        config.setAllowedMethods(Arrays.asList(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        config.setAllowedHeaders(Arrays.asList(
                "Authorization",
                "Content-Type",
                "Accept",
                "Origin"
        ));

        config.setExposedHeaders(Arrays.asList(
                "Authorization"
        ));

        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}