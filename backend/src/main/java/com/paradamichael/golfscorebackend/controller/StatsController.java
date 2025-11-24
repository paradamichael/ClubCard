package com.paradamichael.golfscorebackend.controller;

import com.paradamichael.golfscorebackend.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
public class StatsController {

    @Autowired
    private StatsService statsService;

    @GetMapping("/course-averages")
    public ResponseEntity<List<Map<String, Object>>> getCourseAverages(@RequestParam Long userId) {
        return ResponseEntity.ok(statsService.getCourseAverages(userId));
    }

    @GetMapping("/club-performance")
    public ResponseEntity<List<Map<String, Object>>> getClubPerformance(@RequestParam Long userId) {
        return ResponseEntity.ok(statsService.getClubPerformance(userId));
    }
}
