package com.paradamichael.golfscorebackend.service;

import com.paradamichael.golfscorebackend.model.Course;
import com.paradamichael.golfscorebackend.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> findAll() { return courseRepository.findAll(); }

    public Course save(Course c) { return courseRepository.save(c); }

    public void delete(Long id) { courseRepository.deleteById(id); }
}
