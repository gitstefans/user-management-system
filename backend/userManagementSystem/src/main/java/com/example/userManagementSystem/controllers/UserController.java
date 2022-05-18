package com.example.userManagementSystem.controllers;

import com.example.userManagementSystem.domain.User;
import com.example.userManagementSystem.model.UserModel;
import com.example.userManagementSystem.repository.UserRepository;
import com.example.userManagementSystem.service.UserService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private static final int DEFAULT_PAGE_SIZE = 10;
    //private static final Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "id");

    private final UserRepository userRepository;
    private final UserService userService;

    public UserController(final UserRepository userRepository, final UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
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
        System.out.println("QWEQWEQW " + userRepository.findAll(pageRequest));

        return ResponseEntity.ok(userRepository.findAll(pageRequest));
    }

    @PostMapping("/users/add-user")
    public void addUser(@RequestBody final UserModel userModel) {
        userService.saveUser(userModel);
    }

    @PutMapping("/users/edit-user")
    public void editUser(@RequestBody final UserModel userModel) {
        User user = userRepository.findByUserName(userModel.getUserName());

        if(user != null) {
            userService.editUser(userModel, user);
        }

    }

    @DeleteMapping("/users/delete-user/{id}")
    public void deleteUser(@PathVariable("id") long id) {
        userRepository.deleteById(id);
    }

//    private static final int DEFAULT_PAGE_SIZE = 10;
//
//    @GetMapping("/users")
//    public String hello() {
//        return "Hello";
//    }
}
