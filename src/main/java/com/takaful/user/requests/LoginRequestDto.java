package com.takaful.user.requests;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String username;
    private String password;
}
