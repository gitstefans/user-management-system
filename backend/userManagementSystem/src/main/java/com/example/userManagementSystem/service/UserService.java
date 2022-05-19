package com.example.userManagementSystem.service;

import com.example.userManagementSystem.domain.Authority;
import com.example.userManagementSystem.domain.User;
import com.example.userManagementSystem.model.UserAuthorityModel;
import com.example.userManagementSystem.model.UserModel;
import com.example.userManagementSystem.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(final UserRepository userRepository, final PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void saveUser(final UserModel userModel) {

        if(userModel != null) {
            //long uuid = UUID.randomUUID().getMostSignificantBits();
            //UUID uuid = UUID.randomUUID();
            Random rd = new Random();
            long id = rd.nextInt();
            User user = new User();
            user.setId(id);
            user.setFirstName(userModel.getFirstName());
            user.setLastName(userModel.getLastName());
            user.setUserName(userModel.getUserName());
            user.setEmail(userModel.getEmail());
            user.setStatus(userModel.getStatus());
            //String encryptedPassword = passwordEncoder.encode(userModel.getPassword());
            user.setPassword(userModel.getPassword());

            userRepository.saveAndFlush(user);

        }
    }

    public void editUser(final UserModel userModel, final User user) {

        if(userModel != null) {
            user.setFirstName(userModel.getFirstName());
            user.setLastName(userModel.getLastName());
            user.setEmail(userModel.getEmail());
            user.setStatus(userModel.getStatus());

            userRepository.saveAndFlush(user);

        }
    }

    public void addAuthority(final User user,final UserAuthorityModel userAuthorityModel) {
        Set<Authority> authorities = new HashSet<>();
        System.out.printf("USER " + userAuthorityModel);

        user.setAuthorities(userAuthorityModel.getAuthority());
        userRepository.saveAndFlush(user);
    }
}
