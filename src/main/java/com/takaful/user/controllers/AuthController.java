package com.takaful.user.controllers;

import com.takaful.user.requests.CreateUserDto;
import com.takaful.user.requests.LoginRequestDto;
import com.takaful.user.dtos.RoleDto;
import com.takaful.user.entities.Permission;
import com.takaful.user.entities.User;
import com.takaful.user.repositories.PermissionRepository;
import com.takaful.user.repositories.RoleService;
import com.takaful.user.repositories.UserRepository;
import com.takaful.user.responses.PageResponse;
import com.takaful.user.responses.UserResponse;
import com.takaful.user.services.PermissionService;
import com.takaful.user.services.UserService;
import com.takaful.user.utils.JwtUtil;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final RoleService roleService;
    private final UserService userService;
    private final PermissionService permissionService;
    private final PermissionRepository permissionRepository;
    private final PasswordEncoder passwordEncoder;
//    @PostMapping("/login")
//    public String login(@RequestParam String phone) {
//        User user = userRepository.findByPhone(phone);
//        return jwtUtil.generateToken(user);
//    }

    @PostConstruct
    public void initAdmin() {
        if(userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("123"));
            userRepository.save(admin);
        }
    }
    @PostMapping("/login")
    public String login(@RequestBody LoginRequestDto request) {


       // System.out.println(new BCryptPasswordEncoder().encode("123"));
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user);
    }
    @GetMapping("/permissions")
    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }

    @GetMapping("/permissions/grouped")
    public List<Map<String, Object>> getPermissions() {
        return permissionService.getGroupedPermissions();
    }

    @GetMapping("/roles")
    public List<RoleDto> getRoles() {
        return roleService.getAllRoles();
    }

    @PutMapping("/roles/{id}/permissions")
    public void updateRolePermissions(
            @PathVariable Long id,
            @RequestBody Set<String> permissionsCodes
    ) {
        roleService.updatePermissions(id, permissionsCodes);
    }

    @GetMapping("/users")
    public PageResponse<UserResponse> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "asc") String direction,
            Authentication auth
    ) {
        return userService.getUsers(page, size, search, sort, direction, auth);
    }


    @PostMapping("/users/add")
    public User create(@RequestBody CreateUserDto dto, Authentication auth) {

        User currentUser = userService.getCurrentUser(auth);

        return userService.createUser(dto, currentUser);
    }
}

