package com.paradamichael.golfscorebackend.controller;

import com.paradamichael.golfscorebackend.model.UserPreferences;
import com.paradamichael.golfscorebackend.model.User;
import com.paradamichael.golfscorebackend.repository.UserPreferencesRepository;
import com.paradamichael.golfscorebackend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/preferences")
@CrossOrigin(origins = "*")
public class UserPreferencesController {
    private final UserPreferencesRepository preferencesRepository;
    private final UserRepository userRepository;

    public UserPreferencesController(UserPreferencesRepository preferencesRepository, UserRepository userRepository) {
        this.preferencesRepository = preferencesRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserPreferences> getPreferences(@PathVariable Long userId) {
        return preferencesRepository.findByUserId(userId)
            .map(ResponseEntity::ok)
            .orElseGet(() -> {
                // Create default preferences if not found
                UserPreferences prefs = new UserPreferences();
                User user = userRepository.findById(userId).orElseThrow();
                prefs.setUser(user);
                prefs.setDarkMode(false);
                return ResponseEntity.ok(preferencesRepository.save(prefs));
            });
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserPreferences> updatePreferences(
            @PathVariable Long userId,
            @RequestBody Map<String, Boolean> body) {
        UserPreferences prefs = preferencesRepository.findByUserId(userId)
            .orElseGet(() -> {
                UserPreferences newPrefs = new UserPreferences();
                User user = userRepository.findById(userId).orElseThrow();
                newPrefs.setUser(user);
                return newPrefs;
            });
        
        if (body.containsKey("darkMode")) {
            prefs.setDarkMode(body.get("darkMode"));
        }
        
        return ResponseEntity.ok(preferencesRepository.save(prefs));
    }
}
