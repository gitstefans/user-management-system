package com.example.userManagementSystem.repository;

import com.example.userManagementSystem.domain.Authority;
import com.example.userManagementSystem.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, String> {

    Page<Authority> findAll(final Pageable pageable);
}
