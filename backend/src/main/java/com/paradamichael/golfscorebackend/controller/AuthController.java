package com.paradamichael.golfscorebackend.controller;

import com.paradamichael.golfscorebackend.model.User;
import com.paradamichael.golfscorebackend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid credentials"));
        }
        
        // Return user info (in production, Keycloak will handle JWT tokens)
        return ResponseEntity.ok(Map.of("user", Map.of("id", user.getId(), "email", user.getEmail(), "name", user.getName())));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String name = body.get("name");
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already in use"));
        }
        User u = new User();
        u.setEmail(email);
        u.setName(name);
        u.setPassword(passwordEncoder.encode(password));
        userRepository.save(u);
        // Return user info (Keycloak will handle JWT tokens in production)
        return ResponseEntity.ok(Map.of("user", Map.of("id", u.getId(), "email", u.getEmail(), "name", u.getName())));
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
        String idToken = body.get("idToken");
        if (idToken == null) return ResponseEntity.badRequest().body(Map.of("error", "Missing idToken"));

        // Verify token with Google
        var rest = new org.springframework.web.client.RestTemplate();
        String infoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;
        try {
            @SuppressWarnings("unchecked")
            var info = rest.getForObject(infoUrl, java.util.Map.class);
            if (info == null || info.get("sub") == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid token"));
            }
            String email = (String) info.get("email");
            String name = (String) info.get("name");

            // find or create user
            var userOpt = userRepository.findByEmail(email);
            User user;
            if (userOpt.isPresent()) {
                user = userOpt.get();
            } else {
                user = new User();
                user.setEmail(email);
                user.setName(name);
                // no local password
                user.setPassword("");
                userRepository.save(user);
            }

            // Return user info (Keycloak will handle JWT tokens in production)
            return ResponseEntity.ok(Map.of("user", Map.of("id", user.getId(), "email", email, "name", name)));
        } catch (org.springframework.web.client.RestClientException ex) {
            return ResponseEntity.status(401).body(Map.of("error", "Token verification failed"));
        }
    }
}
