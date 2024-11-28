package com.springboot.backend.jfranco.userapp.users_backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.jfranco.userapp.users_backend.entities.Role;
import com.springboot.backend.jfranco.userapp.users_backend.entities.User;
import com.springboot.backend.jfranco.userapp.users_backend.models.IUser;
import com.springboot.backend.jfranco.userapp.users_backend.models.UserRequest;
import com.springboot.backend.jfranco.userapp.users_backend.repositories.RoleRepository;
import com.springboot.backend.jfranco.userapp.users_backend.repositories.UserRespositoy;

@Service
public class UserServiceimpl implements IUserService{

    @Autowired
    private UserRespositoy userRespositoy;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userRespositoy.findAll();
    }
    @Override
    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        return this.userRespositoy.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(long id) {
        return userRespositoy.findById(id);
    }

    @Override
    @Transactional
    public User save(User user) {
        List<Role> roles = getOptionalRole(user);
        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRespositoy.save(user);
    }
    

    @Override
    @Transactional
    public void deleteById(long id) {
        userRespositoy.deleteById(id);
    }
    @Override
    @Transactional
    public Optional<User> update(UserRequest user, Long id) {
        Optional<User> userOptional = userRespositoy.findById(id);
        if (userOptional.isPresent()) {
            User userBd = userOptional.get();
            userBd.setEmail(user.getEmail());
            userBd.setLastname(user.getLastname());
            userBd.setName(user.getName());
            userBd.setUsername(user.getUsername());

            List<Role> roles = getOptionalRole(user);
            userBd.setRoles(roles);
            return Optional.of(userRespositoy.save(userBd));
        }
        return Optional.empty();
            
    }


    private List<Role> getOptionalRole(IUser user) {
        List<Role> roles = new ArrayList<>();
        Optional<Role> optionalRoleUser = roleRepository.findByName("ROLE_USER");
        optionalRoleUser.ifPresent(role -> roles.add(role));

        if(user.isAdmin()){
            Optional<Role> optionalRoleAdmin = roleRepository.findByName("ROLE_ADMIN");
            optionalRoleAdmin.ifPresent(role -> roles.add(role));
        }
        return roles;
    }
    

    
}
