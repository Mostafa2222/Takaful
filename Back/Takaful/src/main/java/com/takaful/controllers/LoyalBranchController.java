package com.takaful.controllers;

import com.takaful.entities.LoyalBranches;
import com.takaful.services.LoyalBranchService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/branches")
@CrossOrigin
public class LoyalBranchController {

    private final LoyalBranchService service;

    public LoyalBranchController(LoyalBranchService service) {
        this.service = service;
    }

    @PostMapping
    public LoyalBranches create(@RequestBody LoyalBranches branch) {
        return service.create(branch);
    }

    @PutMapping("/{id}")
    public LoyalBranches update(@PathVariable UUID id, @RequestBody LoyalBranches branch) {
        return service.update(id, branch);
    }

    @GetMapping
    public List<LoyalBranches> getAll() {
        return service.getAll();
    }

//    @DeleteMapping("/{id}")
//    public void delete(@PathVariable UUID id) {
//        repo.deleteById(id);
//    }
}