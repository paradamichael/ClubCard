package com.paradamichael.golfscorebackend.service;

import com.paradamichael.golfscorebackend.model.Scorecard;
import com.paradamichael.golfscorebackend.repository.ScorecardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScorecardService {
    private final ScorecardRepository scorecardRepository;

    public ScorecardService(ScorecardRepository scorecardRepository) {
        this.scorecardRepository = scorecardRepository;
    }

    public List<Scorecard> findAll() { return scorecardRepository.findAll(); }

    public List<Scorecard> findByUserId(Long userId) { 
        return scorecardRepository.findByUserIdOrderByPlayedOnDesc(userId); 
    }

    public Scorecard save(Scorecard s) { return scorecardRepository.save(s); }

    public void delete(Long id) { scorecardRepository.deleteById(id); }
}
