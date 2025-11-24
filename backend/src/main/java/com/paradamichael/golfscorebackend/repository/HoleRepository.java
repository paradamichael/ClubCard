package com.paradamichael.golfscorebackend.repository;

import com.paradamichael.golfscorebackend.model.Hole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoleRepository extends JpaRepository<Hole, Long> {
    List<Hole> findByCourseIdOrderByHoleNumber(Long courseId);
}
