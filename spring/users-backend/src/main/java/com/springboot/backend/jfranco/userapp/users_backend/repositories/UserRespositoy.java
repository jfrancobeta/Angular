package com.springboot.backend.jfranco.userapp.users_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.jfranco.userapp.users_backend.entities.User;

public interface UserRespositoy extends JpaRepository<User,Long>{

    
}
