package com.paradamichael.golfscorebackend.controller;

import com.paradamichael.golfscorebackend.model.Club;
import com.paradamichael.golfscorebackend.model.User;
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
    public List<Club> list(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return clubRepository.findByUserId(userId);
        }
        return clubRepository.findAll();
    }

    @PostMapping
    public Club create(@RequestBody java.util.Map<String, Object> payload) {
        Club club = new Club();
        club.setClubName((String) payload.get("clubName"));
        club.setClubType((String) payload.get("clubType"));
        
        if (payload.get("carryDistance") != null) {
            club.setCarryDistance(((Number) payload.get("carryDistance")).intValue());
        }
        
        if (payload.get("userId") != null) {
            Long userId = ((Number) payload.get("userId")).longValue();
            User user = new User();
            user.setId(userId);
            club.setUser(user);
        }
        
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
