package com.typingspeed.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "typing_results")
@Data
public class TypingResult {
    private String typedText;
    private double wpm; 
}

// No functional changes - triggering PR for review setup
