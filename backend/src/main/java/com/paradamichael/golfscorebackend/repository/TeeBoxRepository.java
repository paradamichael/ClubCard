package com.paradamichael.golfscorebackend.repository;

import com.paradamichael.golfscorebackend.model.TeeBox;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TeeBoxRepository extends JpaRepository<TeeBox, Long> {
    List<TeeBox> findByCourseId(Long courseId);
}
