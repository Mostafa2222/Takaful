package com.takaful.controllers;

import com.takaful.services.CustomerCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer-cards")
@RequiredArgsConstructor
@CrossOrigin
public class CustomerCardController {

    private final CustomerCardService service;

//    @PostMapping("/assign")
//    public CustomerCardResponse assign(@RequestBody AssignCardRequest req) {
//        return service.assign(req);
//    }
}
