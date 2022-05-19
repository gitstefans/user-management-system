package com.example.userManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AuthorityModel {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("code")
    private String code;

//    @JsonProperty("name")
//    private String name;

    @JsonProperty("description")
    private String description;
}
