package com.example.userManagementSystem.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PaginationDTO {

    private int page;
    private int size;
    private long numberOfElements;
    private long totalElements;
    private long totalPages;
    private boolean first;
    private boolean last;

    public PaginationDTO() {}

    public PaginationDTO(int page, int size, long numberOfElements, long totalElements, long totalPages, boolean first, boolean last) {
        this.page = page;
        this.size = size;
        this.numberOfElements = numberOfElements;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.first = first;
        this.last = last;
    }
}
