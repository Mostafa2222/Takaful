package com.takaful.controllers;

import com.takaful.entities.CardType;
import com.takaful.repositories.CustomerCardRepository;
import com.takaful.requests.CreateCardRequest;
import com.takaful.response.CardResponse;
import com.takaful.services.CardService;
import com.takaful.services.CardTypeService;
import com.takaful.services.CloudinaryService;
import com.takaful.services.CustomerCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CardController {

    private final CardService cardService;
    private final CustomerCardService customerCardService;
    private final CustomerCardRepository repo;
    private final CardTypeService service;
    private final String UPLOAD_DIR = "uploads/";
    private final CloudinaryService cloudinary;


    @GetMapping("/card-types")
    public List<CardType> getAllCardTypes() {
        return service.getAll();
    }
    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateCardRequest request) {

        CardResponse card = cardService.createCard(request);
        //Card card = new Card();
        return ResponseEntity.ok(card);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable UUID id) {


        CardResponse card = cardService.getById(id);

        return ResponseEntity.ok(card);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        try {

//            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
//
//            Path path = Paths.get(UPLOAD_DIR + fileName);
//            Files.createDirectories(path.getParent());
//
//            file.transferTo(path);

//            String url = "http://localhost:2026/uploads/" + fileName;
            String url = cloudinary.upload(file);
            return ResponseEntity.ok(Map.of("url", url));

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Upload failed");
        }
    }

    @PostMapping("/{id}/activate")
    public CardResponse activate(@PathVariable UUID id) {
        return cardService.activate(id);
    }


    @GetMapping
    public ResponseEntity<List<CardResponse>> getAll() {
        return ResponseEntity.ok(cardService.getAllCards());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        cardService.deleteCard(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable UUID id,
            @RequestBody CreateCardRequest request
    ) {

        CardResponse updated = cardService.updateCard(id, request);

        return ResponseEntity.ok(updated);
    }
//    @PostMapping("/scan")
//    public CustomerCard scan(
//            @RequestParam String qr,
//            @RequestParam(defaultValue = "1") int stamps
//    ) {
//        return customerCardService.addStamp(qr, stamps);
//    }
//    @PostMapping("/scan")
//    public void scan(@RequestParam String qr) {
//        CustomerCard cc = repo.findByQrCode(qr);
//        service.addStamp(cc.getId());
//    }
}