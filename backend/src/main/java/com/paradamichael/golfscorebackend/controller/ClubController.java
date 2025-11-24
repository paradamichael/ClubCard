package com.paradamichael.golfscorebackend.controller;

import com.paradamichael.golfscorebackend.model.Club;
import com.paradamichael.golfscorebackend.repository.ClubRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubs")
public class ClubController {
    private final ClubRepository clubRepository;

    public ClubController(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    @GetMapping
    public List<Club> list() {
        return clubRepository.findAll();
    }

    @PostMapping
    public Club create(@RequestBody Club club) {
        return clubRepository.save(club);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Club> get(@PathVariable Long id) {
        return clubRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        clubRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
