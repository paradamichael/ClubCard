package com.paradamichael.golfscorebackend.controller;

import com.paradamichael.golfscorebackend.model.Scorecard;
import com.paradamichael.golfscorebackend.service.ScorecardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scorecards")
public class ScorecardController {
    private final ScorecardService scorecardService;

    public ScorecardController(ScorecardService scorecardService) { this.scorecardService = scorecardService; }

    @GetMapping
    public List<Scorecard> list() { return scorecardService.findAll(); }

    @PostMapping
    public Scorecard create(@RequestBody Scorecard s) { return scorecardService.save(s); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { scorecardService.delete(id); }
}
