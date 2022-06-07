package com.example.userManagementSystem.service;

import com.example.userManagementSystem.domain.Authority;
import com.example.userManagementSystem.domain.User;
import com.example.userManagementSystem.model.UserAuthorityModel;
import com.example.userManagementSystem.model.UserModel;
import com.example.userManagementSystem.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;

import javax.persistence.PersistenceException;
import javax.persistence.RollbackException;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.util.*;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(final UserRepository userRepository, final PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity saveUser(final UserModel userModel) throws Exception {

        if(userModel != null) {
            User userExist = userRepository.findByUserName(userModel.getUserName());

            if(userExist != null) {
                return ResponseEntity.badRequest().body("Username already exists!");
            } else {

                if(userModel.getFirstName() == null || userModel.getFirstName().isEmpty() || userModel.getFirstName().isBlank()) {
                    return ResponseEntity.badRequest().body("Firstname is required!");
                }
                if(userModel.getLastName() == null || userModel.getLastName().isEmpty() || userModel.getLastName().isBlank()) {
                    return ResponseEntity.badRequest().body("Lastname is required!");
                }
                if(userModel.getUserName() == null || userModel.getUserName().isEmpty() || userModel.getUserName().isBlank()) {
                    return ResponseEntity.badRequest().body("Username is required!");
                }
                if(userModel.getPassword() == null || userModel.getPassword().isEmpty() || userModel.getPassword().isBlank()) {
                    return ResponseEntity.badRequest().body("Password is required!");
                }
                if(userModel.getEmail() == null || userModel.getEmail().isEmpty() || userModel.getEmail().isBlank()) {
                    return ResponseEntity.badRequest().body("Email is required!");
                }
                if(userModel.getStatus() == null || userModel.getStatus().isEmpty() || userModel.getStatus().isBlank()) {
                    return ResponseEntity.badRequest().body("Status is required!");
                }

                //long uuid = UUID.randomUUID().getMostSignificantBits();
                //UUID uuid = UUID.randomUUID();
                Random rd = new Random();
                long id = rd.nextInt();
                User user = new User();
                user.setId(id);
                user.setFirstName(userModel.getFirstName().trim());
                user.setLastName(userModel.getLastName().trim());
                user.setUserName(userModel.getUserName().trim());
                user.setEmail(userModel.getEmail().trim());
                user.setStatus(userModel.getStatus().trim());
                //String encryptedPassword = passwordEncoder.encode(userModel.getPassword());
                user.setPassword(userModel.getPassword().trim());

                try {
                    userRepository.saveAndFlush(user);
                } catch (PersistenceException e) {
                    return ResponseEntity.badRequest().body(e.getMessage());
                }
            }
        } else {
            return ResponseEntity.badRequest().body("User is null!");
        }
        return ResponseEntity.ok("User saved successfully!");
    }

    public ResponseEntity editUser(final UserModel userModel) {

        User user = userRepository.findUserById(userModel.getId());

        if(user == null) {
            return ResponseEntity.badRequest().body("User not found!");
        }

        if(userModel != null) {

            if(userModel.getFirstName() == null || userModel.getFirstName().isEmpty() || userModel.getFirstName().isBlank()) {
                return ResponseEntity.badRequest().body("Firstname is required!");
            }
            if(userModel.getLastName() == null || userModel.getLastName().isEmpty() || userModel.getLastName().isBlank()) {
                return ResponseEntity.badRequest().body("Lastname is required!");
            }
            if(userModel.getEmail() == null || userModel.getEmail().isEmpty() || userModel.getEmail().isBlank()) {
                return ResponseEntity.badRequest().body("Email is required!");
            }
            if(userModel.getStatus() == null || userModel.getStatus().isEmpty() || userModel.getStatus().isBlank()) {
                return ResponseEntity.badRequest().body("Status is required!");
            }

            user.setFirstName(userModel.getFirstName().trim());
            user.setLastName(userModel.getLastName().trim());
            user.setEmail(userModel.getEmail().trim());
            user.setStatus(userModel.getStatus().trim());

            userRepository.saveAndFlush(user);
        } else {
            return ResponseEntity.badRequest().body("User is null!");
        }

        return ResponseEntity.ok("User edited successfully!");
    }

    public void addAuthority(final UserAuthorityModel userAuthorityModel) {
        User user = userRepository.findUserById(userAuthorityModel.getId());

        if(user != null) {
            user.setAuthorities(userAuthorityModel.getAuthority());
            userRepository.saveAndFlush(user);
        }
    }
}
