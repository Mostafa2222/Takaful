package com.takaful.user.requests;

import lombok.Data;

@Data
public class CreateUserDto {
        public String username;
        public String nameAr;
        public String nameEn;
        private String lastNameAr;
        private String lastNameEn;
        public String phone;
        public String email;
        public String password;
        private String country;
        private String city;

        private Boolean isActive;
        private Boolean canPrint;
        public Long roleId;
}
