package com.takaful.controllers;

import com.takaful.requests.RedeemRequest;
import com.takaful.response.RedeemResponse;
import com.takaful.services.RedeemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/redeem")
@RequiredArgsConstructor
@CrossOrigin
public class RedeemController {

    private final RedeemService service;

    @PostMapping
    public RedeemResponse redeem(@RequestBody RedeemRequest req) throws Exception {
        return service.redeem(req);
    }
}
