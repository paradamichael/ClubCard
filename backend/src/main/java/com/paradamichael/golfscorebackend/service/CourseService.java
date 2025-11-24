package com.paradamichael.golfscorebackend.service;

import com.paradamichael.golfscorebackend.model.Course;
import com.paradamichael.golfscorebackend.model.Hole;
import com.paradamichael.golfscorebackend.repository.CourseRepository;
import com.paradamichael.golfscorebackend.repository.HoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final HoleRepository holeRepository;

    public CourseService(CourseRepository courseRepository, HoleRepository holeRepository) {
        this.courseRepository = courseRepository;
        this.holeRepository = holeRepository;
    }

    public List<Course> findAll() { return courseRepository.findAll(); }

    public Course save(Course c) { return courseRepository.save(c); }

    public void delete(Long id) { courseRepository.deleteById(id); }
    
    public List<Hole> getHolesByCourseId(Long courseId) {
        return holeRepository.findByCourseIdOrderByHoleNumber(courseId);
    }
}
