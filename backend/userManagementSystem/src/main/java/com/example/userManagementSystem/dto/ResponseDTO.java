package com.example.userManagementSystem.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ResponseDTO<T> {

    private T data;
    private PaginationDTO paginationDTO;

    public ResponseDTO() {}

    public ResponseDTO(T data) { this.data = data; }

    public ResponseDTO(final T data, final PaginationDTO paginationDTO) {
        this.data = data;
        this.paginationDTO = paginationDTO;
    }
}
