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

    public List<Map<String, Object>> averageScorePerCourse() {
        List<Object[]> rows = scorecardRepository.findAverageScorePerCourse();
        return rows.stream().map(r -> Map.of("courseId", r[0], "avgScore", r[1])).collect(Collectors.toList());
    }

    public List<Map<String, Object>> clubPerformance() {
        List<Object[]> rows = clubRepository.findAvgCarryByClubType();
        return rows.stream().map(r -> Map.of("clubType", r[0], "avgCarry", r[1])).collect(Collectors.toList());
    }
}
