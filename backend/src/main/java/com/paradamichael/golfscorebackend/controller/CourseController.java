package com.paradamichael.golfscorebackend.controller;

import com.paradamichael.golfscorebackend.model.Course;
import com.paradamichael.golfscorebackend.model.TeeBox;
import com.paradamichael.golfscorebackend.service.CourseService;
import com.paradamichael.golfscorebackend.repository.TeeBoxRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    private final CourseService courseService;
    private final TeeBoxRepository teeBoxRepository;

    public CourseController(CourseService courseService, TeeBoxRepository teeBoxRepository) { 
        this.courseService = courseService;
        this.teeBoxRepository = teeBoxRepository;
    }

    @GetMapping
    public List<Course> list() { return courseService.findAll(); }

    @GetMapping("/{courseId}/tees")
    public List<TeeBox> getTeeBoxes(@PathVariable Long courseId) {
        return teeBoxRepository.findByCourseId(courseId);
    }

    @GetMapping("/{courseId}/holes")
    public List<com.paradamichael.golfscorebackend.model.Hole> getHoles(@PathVariable Long courseId) {
        return courseService.getHolesByCourseId(courseId);
    }

    @PostMapping
    public Course create(@RequestBody Course course) { return courseService.save(course); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { courseService.delete(id); }
}
