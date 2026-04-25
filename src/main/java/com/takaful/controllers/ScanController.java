package com.takaful.controllers;

import com.takaful.requests.ScanRequest;
import com.takaful.response.ScanResponse;
import com.takaful.services.ScanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scan")
@RequiredArgsConstructor
@CrossOrigin
public class ScanController {

    //private final CustomerCardService service;

    private final ScanService service;

    @PostMapping
    public ScanResponse scan(@RequestBody ScanRequest req) throws Exception {
        return service.scan(req);
    }
//    @PostMapping
//    public CustomerCard scan(@RequestParam String qr) {
//        return service.addStamp(qr);
//    }
}
