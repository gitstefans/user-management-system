package com.example.userManagementSystem.repository;

import com.example.userManagementSystem.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String username);

    List<User> findAllByUserName(String username);

    List<User> findAllByFirstName(String firstname);

    List<User> findAllByLastName(String lastname);

    List<User> findAllByEmail(String email);

    List<User> findAllByStatus(String status);

    Page<User> findAll(final Pageable pageable);

    Page<User> findAllOrderByFirstName(String firstName, final Pageable pageable);
}
