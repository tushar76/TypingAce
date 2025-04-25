package com.typingspeed.repository;

import com.typingspeed.model.TypingResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypingResultRepository extends MongoRepository<TypingResult, String> {
}
