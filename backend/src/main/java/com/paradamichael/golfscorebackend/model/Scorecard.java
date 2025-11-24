package com.paradamichael.golfscorebackend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "scorecards")
public class Scorecard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private LocalDate playedOn;

    @ElementCollection
    @CollectionTable(name = "scorecard_scores", joinColumns = @JoinColumn(name = "scorecard_id"))
    private List<Integer> scores;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public LocalDate getPlayedOn() { return playedOn; }
    public void setPlayedOn(LocalDate playedOn) { this.playedOn = playedOn; }
    public List<Integer> getScores() { return scores; }
    public void setScores(List<Integer> scores) { this.scores = scores; }
}
