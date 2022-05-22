package com.example.userManagementSystem.controllers;

import com.example.userManagementSystem.domain.Authority;
import com.example.userManagementSystem.domain.User;
import com.example.userManagementSystem.model.UserAuthorityModel;
import com.example.userManagementSystem.model.UserModel;
import com.example.userManagementSystem.repository.AuthorityRepository;
import com.example.userManagementSystem.repository.UserRepository;
import com.example.userManagementSystem.service.UserService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {

    private static final int DEFAULT_PAGE_SIZE = 10;
    //private static final Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "id");

    private final UserRepository userRepository;
    private final UserService userService;
    private final AuthorityRepository authorityRepository;

    public UserController(final UserRepository userRepository,
                          final UserService userService,
                          final AuthorityRepository authorityRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.authorityRepository = authorityRepository;
    }

    @GetMapping("/")
    public String home() {
        return ("<h1>Welcome</>");
    }

    //@CrossOrigin
    @GetMapping("/users")
    //@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity allUsers(final Pageable pageable, final Sort sort) {

        PageRequest pageRequest;
        Sort sortByParam;

        if(sort == null) {
            sortByParam = Sort.by(Sort.Direction.DESC, "id");
        } else {
            sortByParam = sort;
        }

        if(pageable == null) {
            pageRequest = PageRequest.of(0, DEFAULT_PAGE_SIZE, sortByParam);
        } else {
            pageRequest = PageRequest.of(pageable.getPageNumber(), DEFAULT_PAGE_SIZE, sortByParam);
        }

        return ResponseEntity.ok(userRepository.findAll(pageRequest));
    }

    @GetMapping("/users/{id}")
    public User findUserById(@PathVariable("id") long id) {
        return userRepository.findUserById(id);
    }

    @PostMapping("/users/add-user")
    public void addUser(@RequestBody final UserModel userModel) {

        if(userModel != null) {
            userService.saveUser(userModel);
        }

    }

    @PutMapping("/users/edit-user")
    public void editUser(@RequestBody final UserModel userModel) {
        User user = userRepository.findUserById(userModel.getId());

        if(user != null) {
            userService.editUser(userModel, user);
        }

    }

    @DeleteMapping("/users/delete-user/{id}")
    public void deleteUser(@PathVariable("id") long id) {
        userRepository.deleteById(id);
    }


    @PostMapping("users/add-authorities")
    public void addAuthorities(@RequestBody final UserAuthorityModel userAuthorityModel) {
        User user = userRepository.findUserById(userAuthorityModel.getId());

        if(user != null) {
            userService.addAuthority(user, userAuthorityModel);
        }
    }

    @GetMapping("/users/authorities")
    public ResponseEntity getAuthorities(final Pageable pageable) {
        PageRequest pageRequest;

        if(pageable == null) {
            pageRequest = PageRequest.of(0, DEFAULT_PAGE_SIZE);
        } else {
            pageRequest = PageRequest.of(pageable.getPageNumber(), DEFAULT_PAGE_SIZE);
        }

        return ResponseEntity.ok(authorityRepository.findAll(pageRequest));
    }

    /** filtering **/

    @GetMapping("/users/filter/firstName")
    public ResponseEntity getUsersByFirstName(final Pageable pageable, final String firstName) {
        PageRequest pageRequest;

        if(pageable == null) {
            pageRequest = PageRequest.of(0, DEFAULT_PAGE_SIZE);
        } else {
            pageRequest = PageRequest.of(pageable.getPageNumber(), DEFAULT_PAGE_SIZE);
        }

        if(firstName != null) {

            return ResponseEntity.ok(userRepository.findAllByFirstName(firstName, pageable));
        }

        return ResponseEntity.ok("User not found");
    }

    @GetMapping("/users/filter/lastName")
    public ResponseEntity getUsersByLastName(final Pageable pageable, final String lastName) {
        PageRequest pageRequest;

        if(pageable == null) {
            pageRequest = PageRequest.of(0, DEFAULT_PAGE_SIZE);
        } else {
            pageRequest = PageRequest.of(pageable.getPageNumber(), DEFAULT_PAGE_SIZE);
        }

        if(lastName != null) {
            return ResponseEntity.ok(userRepository.findAllByLastName(lastName, pageable));
        }

        return ResponseEntity.ok("User not found");
    }

    @GetMapping("/users/filter/userName")
    public ResponseEntity getUsersByUserName(final Pageable pageable, final String userName) {
        PageRequest pageRequest;

        if(pageable == null) {
            pageRequest = PageRequest.of(0, DEFAULT_PAGE_SIZE);
        } else {
            pageRequest = PageRequest.of(pageable.getPageNumber(), DEFAULT_PAGE_SIZE);
        }

        if(userName != null) {
            return ResponseEntity.ok(userRepository.findAllByUserName(userName, pageable));
        }

        return ResponseEntity.ok("User not found");
    }

    @GetMapping("/users/filter/email")
    public ResponseEntity getUsersByEmail(final Pageable pageable, final String email) {
        PageRequest pageRequest;

        if(pageable == null) {
            pageRequest = PageRequest.of(0, DEFAULT_PAGE_SIZE);
        } else {
            pageRequest = PageRequest.of(pageable.getPageNumber(), DEFAULT_PAGE_SIZE);
        }

        if(email != null) {
            return ResponseEntity.ok(userRepository.findAllByEmail(email, pageable));
        }

        return ResponseEntity.ok("User not found");
    }

    @GetMapping("/users/filter/status")
    public ResponseEntity getUsersByStatus(final Pageable pageable, final String status) {
        PageRequest pageRequest;

        if(pageable == null) {
            pageRequest = PageRequest.of(0, DEFAULT_PAGE_SIZE);
        } else {
            pageRequest = PageRequest.of(pageable.getPageNumber(), DEFAULT_PAGE_SIZE);
        }

        if(status != null) {
            return ResponseEntity.ok(userRepository.findAllByStatus(status, pageable));
        }

        return ResponseEntity.ok("User not found");
    }

}
