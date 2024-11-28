package com.springboot.backend.jfranco.userapp.users_backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.jfranco.userapp.users_backend.entities.Role;

public interface RoleRepository extends JpaRepository<Role,Long> {
    
    Optional<Role> findByName(String name);
}
