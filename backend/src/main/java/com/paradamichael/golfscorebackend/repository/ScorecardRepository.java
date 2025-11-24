package com.paradamichael.golfscorebackend.repository;

import com.paradamichael.golfscorebackend.model.Scorecard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ScorecardRepository extends JpaRepository<Scorecard, Long> {
    List<Scorecard> findByUserIdOrderByPlayedOnDesc(Long userId);
    
    @Query(value = "SELECT c.name as courseName, AVG(ss.score) as avgScore " +
                   "FROM scorecards sc " +
                   "JOIN courses c ON sc.course_id = c.id " +
                   "JOIN scorecard_scores ss ON sc.id = ss.scorecard_id " +
                   "WHERE sc.user_id = :userId " +
                   "GROUP BY c.id, c.name", nativeQuery = true)
    List<Map<String, Object>> findAverageScorePerCourse(Long userId);
}
