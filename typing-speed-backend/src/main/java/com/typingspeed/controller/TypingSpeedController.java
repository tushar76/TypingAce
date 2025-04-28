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
        int charactersTyped = typedText.length();
        int elapsedSeconds = (int) payload.get("elapsedSeconds");

        // Calculate words per minute (WPM)
        double words = charactersTyped / 5.0;
        double minutes = elapsedSeconds / 60.0;
        double speedWPM = minutes > 0 ? words / minutes : 0;

        // Create result object
        TypingResult result = new TypingResult();
        result.setTypedText(typedText);
        result.setWpm(speedWPM);

        // Save result
        typingService.saveResult(result);

        // Return the response with WPM
        return ResponseEntity.ok(Map.of(
            "speedWPM", (int) Math.round(speedWPM)
        ));
    }
}
