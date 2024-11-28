package com.springboot.backend.jfranco.userapp.users_backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.jfranco.userapp.users_backend.entities.User;
import java.util.Optional;


public interface UserRespositoy extends JpaRepository<User,Long>{

    Page<User> findAll(Pageable pageable);

    Optional<User> findByUsername(String username);
}
