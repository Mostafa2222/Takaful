package com.takaful.services;

import com.takaful.entities.LoyalBranches;
import com.takaful.repositories.LoyalBranchRepository;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.UUID;
import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

import java.nio.file.FileSystems;
import java.nio.file.Path;
@Service
public class LoyalBranchService {

    private final LoyalBranchRepository repo;

    public LoyalBranchService(LoyalBranchRepository repo) {
        this.repo = repo;
    }

    public LoyalBranches create(LoyalBranches branch) {

        // save الأول
        LoyalBranches saved = repo.save(branch);
        // generate link
        String link = "http://localhost:4200/branch/" + saved.getId();
        // generate QR path
        String qrPath = "uploads/qr/" + saved.getId() + ".png";
        try {
            generateQRCode(link, qrPath);
        } catch (Exception e) {
            throw new RuntimeException("QR generation failed");
        }
        // set values
        saved.setPublicLink(link);
        saved.setQrCodePath(qrPath);

        return repo.save(saved);
    }

    public LoyalBranches update(UUID id, LoyalBranches data) {
        LoyalBranches branch = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Branch not found"));

        branch.setName(data.getName());
        branch.setPhoneNumber(data.getPhoneNumber());
        branch.setDescription(data.getDescription());
        branch.setLatitude(data.getLatitude());
        branch.setLongitude(data.getLongitude());
        branch.setGoogleMapsLink(data.getGoogleMapsLink());
        branch.setPosBranchId(data.getPosBranchId());

        return repo.save(branch);
    }

    public List<LoyalBranches> getAll() {
        return repo.findAll();
    }

    public void generateQRCode(String text, String filePath) throws Exception {

        // 🔥 create folders if not exist
        File file = new File(filePath);
        File parentDir = file.getParentFile();

        if (!parentDir.exists()) {
            parentDir.mkdirs(); // create uploads/qr
        }

        BitMatrix matrix = new MultiFormatWriter().encode(
                text,
                BarcodeFormat.QR_CODE,
                300,
                300
        );

        Path path = FileSystems.getDefault().getPath(filePath);
        MatrixToImageWriter.writeToPath(matrix, "PNG", path);
    }
}