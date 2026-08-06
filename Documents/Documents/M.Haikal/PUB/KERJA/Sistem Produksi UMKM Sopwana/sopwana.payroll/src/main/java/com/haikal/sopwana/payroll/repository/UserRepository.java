package com.haikal.sopwana.payroll.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.haikal.sopwana.payroll.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    boolean existsByUsernameIgnoreCase(String username);
}