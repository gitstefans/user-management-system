package com.example.userManagementSystem.repository;

import com.example.userManagementSystem.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String username);

    User findUserById(Long id);

    List<User> findByFirstName(String firstName);

    Page<User> findAllByFirstName(String firstName, final Pageable pageable);

    Page<User> findAllByLastName(String lastName, final Pageable pageable);

    Page<User> findAllByUserName(String userName, final Pageable pageable);

    Page<User> findAllByEmail(String email, final Pageable pageable);

    Page<User> findAllByStatus(String status, final Pageable pageable);

    Page<User> findAll(final Pageable pageable);

    Page<User> findAllOrderByFirstName(String firstName, final Pageable pageable);
}
