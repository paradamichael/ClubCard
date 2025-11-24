package com.paradamichael.golfscorebackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "holes")
public class Hole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private Integer holeNumber;
    private Integer par;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public Integer getHoleNumber() { return holeNumber; }
    public void setHoleNumber(Integer holeNumber) { this.holeNumber = holeNumber; }
    public Integer getPar() { return par; }
    public void setPar(Integer par) { this.par = par; }
}
