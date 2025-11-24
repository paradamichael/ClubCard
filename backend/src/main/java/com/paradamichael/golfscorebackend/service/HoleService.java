package com.paradamichael.golfscorebackend.service;

import com.paradamichael.golfscorebackend.model.Hole;
import com.paradamichael.golfscorebackend.repository.HoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoleService {
    private final HoleRepository holeRepository;

    public HoleService(HoleRepository holeRepository) {
        this.holeRepository = holeRepository;
    }

    public List<Hole> findAll() { return holeRepository.findAll(); }

    public Hole save(Hole h) { return holeRepository.save(h); }

    public void delete(Long id) { holeRepository.deleteById(id); }
}
