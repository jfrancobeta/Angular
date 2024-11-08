package com.springboot.backend.jfranco.userapp.users_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.jfranco.userapp.users_backend.entities.User;
import com.springboot.backend.jfranco.userapp.users_backend.repositories.UserRespositoy;

@Service
public class UserServiceimpl implements IUserService{

    @Autowired
    private UserRespositoy userRespositoy;

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userRespositoy.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(long id) {
        return userRespositoy.findById(id);
    }

    @Override
    @Transactional
    public User save(User user) {
        return userRespositoy.save(user);
    }

    @Override
    @Transactional
    public void deleteById(long id) {
        userRespositoy.deleteById(id);
    }
    
}
