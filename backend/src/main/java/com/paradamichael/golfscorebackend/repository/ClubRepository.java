package com.paradamichael.golfscorebackend.repository;

import com.paradamichael.golfscorebackend.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    List<Club> findByUserId(Long userId);
    
    @Query(value = "SELECT club_type as clubType, AVG(carry_distance) as avgCarry " +
                   "FROM clubs " +
                   "WHERE user_id = :userId " +
                   "GROUP BY club_type", nativeQuery = true)
    List<Map<String, Object>> findAvgCarryByClubType(Long userId);
}
