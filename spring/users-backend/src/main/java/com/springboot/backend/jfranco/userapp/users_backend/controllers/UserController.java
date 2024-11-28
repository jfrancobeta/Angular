package com.springboot.backend.jfranco.userapp.users_backend.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.jfranco.userapp.users_backend.entities.User;
import com.springboot.backend.jfranco.userapp.users_backend.models.UserRequest;
import com.springboot.backend.jfranco.userapp.users_backend.services.IUserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/api/users")
@CrossOrigin(originPatterns = {"*"})// o con origins y poner la ruta
public class UserController {

    @Autowired
    private IUserService userService;

    

    @GetMapping
    public List<User> list() {
        return userService.findAll();
    }
    @GetMapping("/page/{page}")
    public Page<User> listPage(@PathVariable Integer page) {
        Pageable pageable = PageRequest.of(page, 3);
        return userService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<User> userOptional =  userService.findById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        }
        return ResponseEntity.status(404).body(Collections.singletonMap("error","ocurrio un error con el usuario"));
    }
    
    @PostMapping
    public ResponseEntity<?> Create(@Valid @RequestBody User entity, BindingResult result) {
        if(result.hasErrors()){
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(entity));
    }

    

    @PutMapping("/{id}")
    public ResponseEntity<?> Edit(@Valid @RequestBody UserRequest user, BindingResult result,@PathVariable Long id ) {
        if(result.hasErrors()){
            return validation(result);
        }
        Optional<User> userOptional = userService.update(user,id);
        if (userOptional.isPresent()) {
            
            return ResponseEntity.ok(userOptional.get());

        }else{

            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> Delete(@PathVariable Long id) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            userService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach( error -> {
            errors.put(error.getField(), "El campo " + error.getField() + " " + error.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }

    
    
    

    
    
}
