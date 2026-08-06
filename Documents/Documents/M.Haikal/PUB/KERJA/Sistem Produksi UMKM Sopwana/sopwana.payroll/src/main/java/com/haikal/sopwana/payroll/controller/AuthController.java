package com.haikal.sopwana.payroll.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Pattern;

import com.haikal.sopwana.payroll.dto.JwtResponse;
import com.haikal.sopwana.payroll.dto.LoginRequest;
import com.haikal.sopwana.payroll.dto.PekerjaDto;
import com.haikal.sopwana.payroll.entity.Pekerja;
import com.haikal.sopwana.payroll.entity.User;
import com.haikal.sopwana.payroll.repository.PekerjaRepository;
import com.haikal.sopwana.payroll.repository.UserRepository;
import com.haikal.sopwana.payroll.util.JwtUtil;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payroll/auth")
@CrossOrigin(originPatterns = {
    "http://localhost:*", "http://127.0.0.1:*",
    "http://10.*:*", "http://172.*:*", "http://192.168.*:*",
    "https://*.devtunnels.ms"
})
public class AuthController {

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    private static final Pattern NO_HP_PATTERN =
            Pattern.compile("^08[0-9]{8,13}$");

    @Autowired private UserRepository    userRepo;
    @Autowired private PekerjaRepository pekerjaRepo;
    @Autowired private PasswordEncoder   encoder;
    @Autowired private JwtUtil           jwtUtil;

    // ─────────────────────────────────────────────────────────────
    // PERBAIKAN UTAMA di endpoint login:
    //
    // SEBELUM:
    //   String token = jwtUtil.generateToken(username, role);
    //   → pekerjaId tidak masuk ke dalam JWT
    //
    // SESUDAH:
    //   1. Query pekerjaId dari tabel pekerja berdasarkan user yang login
    //   2. Kirim pekerjaId ke generateToken() agar tertanam di JWT
    //   → Frontend & production-service bisa baca pekerjaId dari token
    // ─────────────────────────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        String username = req.getUsername().trim();

        User u = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Username tidak terdaftar!"));

        if (Boolean.FALSE.equals(u.getAktif())) {
            throw new RuntimeException("Akun sudah diarsipkan/nonaktif. Hubungi pemilik.");
        }

        if (!encoder.matches(req.getPassword(), u.getPassword())) {
            throw new RuntimeException("Password salah!");
        }

        String roleString = u.getRole() != null ? u.getRole().toString() : "PEKERJA";

        // ── Cari pekerjaId dari tabel pekerja ────────────────────
        // Dicoba via user_id dulu, fallback ke username.
        Long pekerjaId = pekerjaRepo.findLoginPekerjaByUsername(u.getUsername())
                .or(() -> pekerjaRepo.findLoginPekerjaByNamaFallback(u.getUsername()))
                .map(Pekerja::getIdPekerja)
                .orElse(null);

        // ── Generate JWT dengan pekerjaId tertanam di klaim ──────
        String token = jwtUtil.generateToken(u.getUsername(), roleString, pekerjaId);

        return ResponseEntity.ok(
                new JwtResponse(token, u.getUsername(), roleString, pekerjaId, u.getIdUser())
        );
    }

    @PostMapping("/register")
    @PreAuthorize("hasRole('PEMILIK') or hasRole('ADMIN')")
    public ResponseEntity<?> registerPekerja(@Valid @RequestBody PekerjaDto dto) {
        wajibIsi(dto.getUsername(), "Username wajib diisi");
        wajibIsi(dto.getPassword(), "Password wajib diisi");
        wajibIsi(dto.getNama(),     "Nama pekerja wajib diisi");
        wajibIsi(dto.getEmail(),    "Email pekerja wajib diisi");

        String username = dto.getUsername().trim();
        String email    = dto.getEmail().trim();
        String noHp     = trimToNull(dto.getNoHp());

        validasiFormatEmail(email);
        validasiNoHpWajib(noHp);

        if (userRepo.existsByUsernameIgnoreCase(username)) {
            throw new RuntimeException("Username sudah terdaftar!");
        }
        if (pekerjaRepo.existsByEmailIgnoreCase(email)) {
            throw new RuntimeException("Email pekerja sudah terdaftar!");
        }

        User u = new User();
        u.setUsername(username);
        u.setPassword(encoder.encode(dto.getPassword().trim()));
        u.setAktif(true);
        u.setRole(normalizeRole(dto.getRole()));

        Pekerja p = new Pekerja();
        p.setUser(u);
        p.setNama(dto.getNama().trim());
        p.setEmail(email);
        p.setAlamat(trimToNull(dto.getAlamat()));
        p.setNoHp(noHp);
        p.setDiarsipkan(false);

        pekerjaRepo.save(p);

        return ResponseEntity.ok(
                "Akun dengan username " + u.getUsername()
                + " dan Role " + u.getRole() + " berhasil didaftarkan!"
        );
    }

    // ─── Helpers ──────────────────────────────────────────────────
    private void wajibIsi(String nilai, String pesan) {
        if (nilai == null || nilai.isBlank()) throw new IllegalArgumentException(pesan);
    }

    private String trimToNull(String nilai) {
        return (nilai == null || nilai.isBlank()) ? null : nilai.trim();
    }

    private void validasiFormatEmail(String email) {
        if (email == null || email.isBlank())
            throw new IllegalArgumentException("Email pekerja wajib diisi");
        if (!EMAIL_PATTERN.matcher(email).matches())
            throw new IllegalArgumentException(
                    "Format email tidak valid. Contoh: nama@gmail.com");
    }

    private void validasiNoHpWajib(String noHp) {
        if (noHp == null || noHp.isBlank())
            throw new IllegalArgumentException(
                    "No HP pekerja wajib diisi dan harus diawali 08");
        if (!NO_HP_PATTERN.matcher(noHp).matches())
            throw new IllegalArgumentException(
                    "No HP harus diawali 08 dan berisi 10 sampai 15 digit angka");
    }

    private String normalizeRole(String role) {
        if (role == null || role.isBlank()) return "PEKERJA";
        return role.trim().toUpperCase().replace("ROLE_", "");
    }
}
