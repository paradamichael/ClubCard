package com.paradamichael.golfscorebackend.repository;

import com.paradamichael.golfscorebackend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
