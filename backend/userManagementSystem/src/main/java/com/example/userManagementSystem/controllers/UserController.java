package com.example.userManagementSystem.controllers;

import com.example.userManagementSystem.domain.Authority;
import com.example.userManagementSystem.domain.User;
import com.example.userManagementSystem.dto.ResponseDTO;
import com.example.userManagementSystem.dto.UserDTO;
import com.example.userManagementSystem.mapper.UserMapper;
import com.example.userManagementSystem.model.UserAuthorityModel;
import com.example.userManagementSystem.model.UserModel;
import com.example.userManagementSystem.repository.AuthorityRepository;
import com.example.userManagementSystem.repository.UserRepository;
import com.example.userManagementSystem.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.FilterOutputStream;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private static final int DEFAULT_PAGE_SIZE = 10;

    private final UserRepository userRepository;
    private final UserService userService;
    private final AuthorityRepository authorityRepository;
    private final UserMapper userMapper;

    public UserController(final UserRepository userRepository,
                          final UserService userService,
                          final AuthorityRepository authorityRepository,
                          final UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.authorityRepository = authorityRepository;
        this.userMapper = userMapper;
    }

    @GetMapping("/all-users")
    public ResponseEntity<ResponseDTO<List<UserDTO>>> allUsers(final Pageable pageable, final Sort sort) {

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

        return ResponseEntity.ok(userMapper.toResponseDTO(userRepository.findAll(pageRequest)));
    }

    @GetMapping("/{id}")
    public UserDTO findUserById(@PathVariable("id") long id) {

        return userMapper.toDto(userRepository.findUserById(id));
    }

    @PostMapping("/add-user")
    public ResponseEntity addUser(@RequestBody final UserModel userModel) throws Exception {

        return userService.saveUser(userModel);
    }

    @PutMapping("/edit-user")
    public ResponseEntity editUser(@RequestBody final UserModel userModel) {

        return userService.editUser(userModel);
    }

    @DeleteMapping("/delete-user/{id}")
    public void deleteUser(@PathVariable("id") long id) {
        userRepository.deleteById(id);
    }


    @PostMapping("/add-authorities")
    public void addAuthorities(@RequestBody final UserAuthorityModel userAuthorityModel) {
            userService.addAuthority(userAuthorityModel);
    }

    @GetMapping("/authorities")
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

    @GetMapping("/filter/firstName")
    public ResponseEntity getUsersByFirstName(final Pageable pageable, final String firstName) {
        PageRequest pageRequest;

        if(pageable == null) {
            pageRequest = PageRequest.of(0, DEFAULT_PAGE_SIZE);
        } else {
            pageRequest = PageRequest.of(pageable.getPageNumber(), DEFAULT_PAGE_SIZE);
        }

        if(firstName != null) {
            return ResponseEntity.ok(userMapper.toResponseDTO(userRepository.findAllByFirstName(firstName, pageRequest)));
        }
        return ResponseEntity.badRequest().body("User not found!");
    }

    @GetMapping("/filter/lastName")
    public ResponseEntity getUsersByLastName(final Pageable pageable, final String lastName) {
        PageRequest pageRequest;

        if(pageable == null) {
            pageRequest = PageRequest.of(0, DEFAULT_PAGE_SIZE);
        } else {
            pageRequest = PageRequest.of(pageable.getPageNumber(), DEFAULT_PAGE_SIZE);
        }

        if(lastName != null) {
            return ResponseEntity.ok(userMapper.toResponseDTO(userRepository.findAllByLastName(lastName, pageRequest)));
        }

        return ResponseEntity.badRequest().body("User not found!");
    }

    @GetMapping("/filter/userName")
    public ResponseEntity getUsersByUserName(final Pageable pageable, final String userName) {
        PageRequest pageRequest;

        if(pageable == null) {
            pageRequest = PageRequest.of(0, DEFAULT_PAGE_SIZE);
        } else {
            pageRequest = PageRequest.of(pageable.getPageNumber(), DEFAULT_PAGE_SIZE);
        }

        if(userName != null) {
            return ResponseEntity.ok(userMapper.toResponseDTO(userRepository.findAllByUserName(userName, pageRequest)));
        }

        return ResponseEntity.badRequest().body("User not found!");
    }

    @GetMapping("/filter/email")
    public ResponseEntity getUsersByEmail(final Pageable pageable, final String email) {
        PageRequest pageRequest;

        if(pageable == null) {
            pageRequest = PageRequest.of(0, DEFAULT_PAGE_SIZE);
        } else {
            pageRequest = PageRequest.of(pageable.getPageNumber(), DEFAULT_PAGE_SIZE);
        }

        if(email != null) {
            return ResponseEntity.ok(userMapper.toResponseDTO(userRepository.findAllByEmail(email, pageRequest)));
        }

        return ResponseEntity.badRequest().body("User not found!");
    }

    @GetMapping("/filter/status")
    public ResponseEntity getUsersByStatus(final Pageable pageable, final String status) {
        PageRequest pageRequest;

        if(pageable == null) {
            pageRequest = PageRequest.of(0, DEFAULT_PAGE_SIZE);
        } else {
            pageRequest = PageRequest.of(pageable.getPageNumber(), DEFAULT_PAGE_SIZE);
        }

        if(status != null) {
            return ResponseEntity.ok(userMapper.toResponseDTO(userRepository.findAllByStatus(status, pageRequest)));
        }

        return ResponseEntity.badRequest().body("User not found!");
    }

}
