package com.springboot.backend.jfranco.userapp.users_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.springboot.backend.jfranco.userapp.users_backend.entities.User;
import com.springboot.backend.jfranco.userapp.users_backend.models.UserRequest;

public interface IUserService {
    
    List<User> findAll();
    
    Page<User> findAll(Pageable pageable);

    Optional<User> findById(long id);

    Optional<User> update(UserRequest user,Long id);

    User save(User user);

    void deleteById(long id);
}
