package com.takaful.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService() {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dfu8eonr3",
                "api_key", "555941651938183",
                "api_secret", "V1yzqxjHUkycMafJc1nX6CFX56c"
        ));
    }

    public String upload(MultipartFile file) throws IOException {

        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap("folder", "takaful")
        );

        return uploadResult.get("secure_url").toString();
    }
}
