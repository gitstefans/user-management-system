package com.example.userManagementSystem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@Entity
@Table(name = "Users")
public class User {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(nullable = false, name = "first_name", length = 30)
    private String firstName;

    @NotNull
    @Column(nullable = false, name = "last_name", length = 30)
    private String lastName;

    @NotNull
    @Column(nullable = false, name = "user_name", length = 30)
    private String userName;

    //@JsonIgnore
    @NotNull
    @Column(name = "password_hash", nullable = false)
    private String password;

    @NotNull
    @Column(nullable = false, name = "email", length = 30)
    private String email;

    @NotNull
    @Column(nullable = false, name = "status", length = 30)
    private String status;

    @JsonIgnore
    @OneToMany
    @JoinTable(
            name = "User_Authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "role", referencedColumnName = "code")}
    )
    @BatchSize(size = 20)
    private Set<Authority> authorities = new HashSet<>();
}
