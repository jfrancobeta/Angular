package com.springboot.backend.jfranco.userapp.users_backend.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.jfranco.userapp.users_backend.entities.User;
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
    public ResponseEntity<?> Edit(@Valid @RequestBody User entity, BindingResult result,@PathVariable Long id ) {
        if(result.hasErrors()){
            return validation(result);
        }
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            User userBd = userOptional.get();
            userBd.setEmail(entity.getEmail());
            userBd.setLastname(entity.getLastname());
            userBd.setName(entity.getName());
            userBd.setPassword(entity.getPassword());
            userBd.setUsername(entity.getUsername());
            return ResponseEntity.ok(userService.save(userBd));

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