package com.springboot.backend.jfranco.userapp.users_backend.services;

import java.util.List;
import java.util.Optional;

import com.springboot.backend.jfranco.userapp.users_backend.entities.User;

public interface IUserService {
    
    List<User> findAll();

    Optional<User> findById(long id);

    User save(User user);

    void deleteById(long id);
}
