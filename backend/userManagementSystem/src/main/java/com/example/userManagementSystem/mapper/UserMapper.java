package com.example.userManagementSystem.mapper;

import com.example.userManagementSystem.domain.User;
import com.example.userManagementSystem.dto.PaginationDTO;
import com.example.userManagementSystem.dto.ResponseDTO;
import com.example.userManagementSystem.dto.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserMapper {

    public UserDTO toDto(final User user) {

        if (user == null) {
            return null;
        } else {
            final UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setFirstName(user.getFirstName());
            userDTO.setLastName(user.getLastName());
            userDTO.setUserName(user.getUserName());
            userDTO.setPassword(user.getPassword());
            userDTO.setEmail(user.getEmail());
            userDTO.setStatus(user.getStatus());
            userDTO.setAuthority(user.getAuthorities());
            return userDTO;
        }
    }


    public List<UserDTO> toDtos(final List<User> users) {

        if (CollectionUtils.isEmpty(users)) {
            return Collections.emptyList();
        }
        return users
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public ResponseDTO<List<UserDTO>> toResponseDTO(final Page<User> userList) {

        final ResponseDTO<List<UserDTO>> responseDTO = new ResponseDTO<>();
        responseDTO.setData(
                userList
                        .getContent()
                        .stream()
                        .map(this::toDto)
                        .collect(Collectors.toList())
        );

        final PaginationDTO paginationDTO = new PaginationDTO();
        paginationDTO.setFirst(userList.isFirst());
        paginationDTO.setLast(userList.isLast());
        paginationDTO.setSize(userList.getSize());
        paginationDTO.setPage(userList.getNumber());
        paginationDTO.setNumberOfElements(userList.getNumberOfElements());
        paginationDTO.setTotalPages(userList.getTotalPages());
        paginationDTO.setTotalElements(userList.getTotalElements());
        responseDTO.setPaginationDTO(paginationDTO);
        return responseDTO;
    }
}
