package com.paradamichael.golfscorebackend.service;

import com.paradamichael.golfscorebackend.model.Club;
import com.paradamichael.golfscorebackend.repository.ClubRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubService {
    private final ClubRepository clubRepository;

    public ClubService(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    public List<Club> findAll() { return clubRepository.findAll(); }

    public Club save(Club c) { return clubRepository.save(c); }

    public void delete(Long id) { clubRepository.deleteById(id); }
}
