package com.takaful.user.controllers;

import com.takaful.user.repositories.PermissionRepository;
import com.takaful.user.requests.CreateRoleRequest;
import com.takaful.user.requests.CreateUserRequest;
import com.takaful.user.requests.LoginRequestDto;
import com.takaful.user.entities.Permission;
import com.takaful.user.entities.User;
import com.takaful.user.services.RoleService;
import com.takaful.user.repositories.UserRepository;
import com.takaful.user.responses.PageResponse;
import com.takaful.user.responses.RoleResponse;
import com.takaful.user.responses.UserResponse;
import com.takaful.user.services.PermissionService;
import com.takaful.user.services.UserService;
import com.takaful.user.utils.JwtUtil;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

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
    public Map<String, String> login(@RequestBody LoginRequestDto request) {


        System.out.println("password:" +new BCryptPasswordEncoder().encode("123"));
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user);

        return Map.of("token", token);
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
    public List<RoleResponse> getRoles() {
        return roleService.getAllRoles();
    }

    @PostMapping("/roles")
    public RoleResponse createRole(@RequestBody @Valid CreateRoleRequest request) {
        return roleService.create(request);
    }


    @PutMapping("/roles/{id}/permissions")
//    @PreAuthorize("hasAuthority('VIEW_ROLES')")
    public void updateRolePermissions(
            @PathVariable Long id,
            @RequestBody @Valid CreateRoleRequest req
    ) {
        roleService.update(id, req);
    }

    @DeleteMapping("/roles/{id}")
    public void delete(@PathVariable Long id) {
        roleService.delete(id);
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
    @PreAuthorize("hasAuthority('CREATE_USER')")
    public User create(@RequestBody CreateUserRequest dto, Authentication auth) {

        User currentUser = userService.getCurrentUser(auth);
        return userService.createUser(dto, currentUser);
    }

    @PutMapping("/users/{id}")
    @PreAuthorize("hasAuthority('CREATE_USER')")
    public void updateUsers(
            @PathVariable UUID id,
            @RequestBody @Valid CreateUserRequest req
    ) {
        userService.update(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        userService.delete(id);
    }
}

