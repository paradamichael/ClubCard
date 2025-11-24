package com.paradamichael.golfscorebackend.service;

import com.paradamichael.golfscorebackend.repository.ClubRepository;
import com.paradamichael.golfscorebackend.repository.ScorecardRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatsService {
    private final ScorecardRepository scorecardRepository;
    private final ClubRepository clubRepository;

    public StatsService(ScorecardRepository scorecardRepository, ClubRepository clubRepository) {
        this.scorecardRepository = scorecardRepository;
        this.clubRepository = clubRepository;
    }

    public List<Map<String, Object>> getCourseAverages(Long userId) {
        return scorecardRepository.findAverageScorePerCourse(userId);
    }

    public List<Map<String, Object>> getClubPerformance(Long userId) {
        return clubRepository.findAvgCarryByClubType(userId);
    }
}
