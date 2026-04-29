package com.takaful.user.services;

import com.takaful.user.mappers.UserMapper;
import com.takaful.user.requests.CreateUserRequest;
import com.takaful.user.entities.Role;
import com.takaful.user.entities.User;
import com.takaful.user.repositories.RoleRepository;
import com.takaful.user.repositories.UserRepository;


import com.takaful.user.responses.PageResponse;
import com.takaful.user.responses.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper ;
    private final PasswordEncoder passwordEncoder;

    public PageResponse<UserResponse> getUsers(
            int page,
            int size,
            String search,
            String sort,
            String direction,
            Authentication auth
    ) {

        User currentUser = getCurrentUser(auth);

        Sort.Direction dir = direction.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Sort sortObj = (sort != null && !sort.isEmpty())
                ? Sort.by(dir, sort)
                : Sort.unsorted();

        Pageable pageable = PageRequest.of(page, size, sortObj);

        Page<User> users;

        boolean hasSearch = search != null && !search.trim().isEmpty();

        if (currentUser.hasRole("ADMIN")) {
            users = hasSearch
                    ? userRepository.searchAll(search, pageable)
                    : userRepository.findAll(pageable);
        } else {
            users = hasSearch
                    ? userRepository.searchByParent(currentUser.getId(), search, pageable)
                    : userRepository.findByParentId(currentUser.getId(), pageable);

    }

        return new PageResponse<>(
                users.getContent().stream().map(userMapper::toUserDto).toList(),
                users.getNumber(),
                users.getSize(),
                users.getTotalElements(),
                users.getTotalPages()
        );
    }
    public User createUser(CreateUserRequest dto, User currentUser) {

        Role role = roleRepository.findById(dto.roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        if (currentUser.hasRole("USER") && role.getNameEn().equals("ADMIN")) {
            throw new RuntimeException("Not allowed");
        }

        if(userRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new RuntimeException("Username exists");
        }

        if(currentUser.hasRole("USER") && !role.getNameEn().equals("AGENT")) {
            throw new RuntimeException("Not allowed to create this user");
        }


//        Optional<User> userOpt = userRepository.findByUsername(dto.getUsername());
//
//        if(userOpt.isEmpty()) {
//            userOpt = userRepository.findByEmail(dto.getUsername());
//        }
        User user = new User();

        user.setNameAr(dto.nameAr);
        user.setNameEn(dto.nameEn);
//        user.setLastNameAr(dto.getLastNameAr());
//        user.setLastNameEn(dto.getLastNameEn());
        user.setPhone(dto.phone);
        user.setEmail(dto.email);
        user.setUsername(dto.getUsername());
//        user.setCountry(dto.getCountry());
//        user.setCity(dto.getCity());

        user.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);
        user.setCanPrint(dto.getCanPrint() != null ? dto.getCanPrint() : false);
        user.setPassword(passwordEncoder.encode(dto.password));

        user.setParent(currentUser);

        user.setRole(role);

        return userRepository.save(user);
    }

    public User getCurrentUser(Authentication auth) {
        return (User) auth.getPrincipal();
    }

    public User update(UUID id, CreateUserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setNameAr(request.getNameAr());
        user.setNameEn(request.getNameEn());
        user.setUsername(request.getUsername());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.password));
        user.setIsActive(request.getIsActive());
        user.setCanPrint(request.getCanPrint());

        user.setRole(role);

        return userRepository.save(user);
    }

    public void delete(UUID id) {
        userRepository.deleteById(id);
    }
}
