package com.typingspeed.service;

import com.typingspeed.model.TypingResult;
import com.typingspeed.repository.TypingResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypingService {

    @Autowired
    private TypingResultRepository resultRepository;

    public TypingResult saveResult(TypingResult result) {
        return resultRepository.save(result);
    }
}
// No functional changes - triggering PR for review setup
