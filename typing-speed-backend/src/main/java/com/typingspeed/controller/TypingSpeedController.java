package com.typingspeed.controller;

import com.typingspeed.model.TypingResult;
import com.typingspeed.service.TypingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TypingSpeedController {

    @Autowired
    private TypingService typingService;

    @PostMapping("/calculateSpeed")
    public ResponseEntity<Map<String, Object>> calculateSpeed(@RequestBody Map<String, Object> payload) {
        String typedText = (String) payload.get("typedText");
        String originalText = (String) payload.get("originalText");
        int charactersTyped = typedText.length();
        int elapsedSeconds = (int) payload.get("elapsedSeconds");

        // Calculate WPM
        double words = charactersTyped / 5.0;
        double minutes = elapsedSeconds / 60.0;
        double speedWPM = minutes > 0 ? words / minutes : 0;

        // Calculate Accuracy
        double correctChars = 0;
        for (int i = 0; i < Math.min(typedText.length(), originalText.length()); i++) {
            if (typedText.charAt(i) == originalText.charAt(i)) {
                correctChars++;
            }
        }
        double accuracy = (correctChars / originalText.length()) * 100;

        // Create TypingResult object
        TypingResult result = new TypingResult();
        result.setTypedText(typedText);
        result.setOriginalText(originalText);
        result.setWpm(speedWPM);
        result.setAccuracy(accuracy);

        typingService.saveResult(result);

        return ResponseEntity.ok(Map.of("speedWPM", (int)Math.round(speedWPM), "accuracy", accuracy));
    }
}
