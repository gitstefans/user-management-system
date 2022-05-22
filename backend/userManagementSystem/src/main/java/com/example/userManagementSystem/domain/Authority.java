package com.example.userManagementSystem.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Getter
@Setter
@ToString
@Entity
@Table(name = "Authority")
public class Authority implements Serializable {
    @Id
    private long id;

    @NotNull
    @Column(nullable = false, name = "code", length = 30)
    private String code;

    @NotNull
    @Column(nullable = false, name = "name", length = 30)
    private String name;

    @NotNull
    @Column(nullable = false, name = "description", length = 30)
    private String description;
}
