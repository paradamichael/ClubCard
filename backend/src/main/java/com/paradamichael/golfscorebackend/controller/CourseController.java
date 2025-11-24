package com.paradamichael.golfscorebackend.controller;

import com.paradamichael.golfscorebackend.model.Course;
import com.paradamichael.golfscorebackend.service.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) { this.courseService = courseService; }

    @GetMapping
    public List<Course> list() { return courseService.findAll(); }

    @PostMapping
    public Course create(@RequestBody Course course) { return courseService.save(course); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { courseService.delete(id); }
}
