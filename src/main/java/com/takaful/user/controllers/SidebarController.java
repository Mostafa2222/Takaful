package com.takaful.user.controllers;

import com.takaful.user.dtos.SidebarDto;
import com.takaful.user.services.SidebarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class SidebarController {

    @Autowired
    private SidebarService service;

//    @GetMapping("/sidebar")
//    public List<Map<String, Object>> getSidebar(Authentication auth) {
//        String role = auth.getAuthorities().stream()
//                .findFirst()
//                .map(a -> a.getAuthority().replace("ROLE_", ""))
//                .orElse("USER");
//        return service.getSidebarByRole(role);
//    }

    @GetMapping("/sidebar")
    public List<SidebarDto> getSidebar(Authentication auth) {
        return service.getSidebar(auth);
    }
}
