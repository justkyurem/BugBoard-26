package com.BugBoard_26.BugBoard_26_backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
@CrossOrigin("*")
public class FileController {

    private final Cloudinary cloudinary;

    @Autowired
    public FileController(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        Map<String, String> response = new HashMap<>();

        try {
            // Salva il file su Cloudinary
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            
            // Ottieni l'URL sicuro restituito da Cloudinary
            String fileUrl = uploadResult.get("secure_url").toString();

            response.put("imageUrl", fileUrl);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            response.put("error", "Errore nel caricamento su Cloudinary: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        } catch (Exception e) {
            response.put("error", "Errore inaspettato durante il caricamento: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
