package com.typingspeed.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "typing_results")
@Data
public class TypingResult {
    private String typedText;
    private String originalText;
    private double wpm;
    private double accuracy;
}
