package com.paradamichael.golfscorebackend.controller;

import com.paradamichael.golfscorebackend.model.Hole;
import com.paradamichael.golfscorebackend.service.HoleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/holes")
public class HoleController {
    private final HoleService holeService;

    public HoleController(HoleService holeService) { this.holeService = holeService; }

    @GetMapping
    public List<Hole> list() { return holeService.findAll(); }

    @PostMapping
    public Hole create(@RequestBody Hole hole) { return holeService.save(hole); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { holeService.delete(id); }
}
