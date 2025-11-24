package com.paradamichael.golfscorebackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String courseName;
    private String location;
    private Integer holesCount;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public Integer getHolesCount() { return holesCount; }
    public void setHolesCount(Integer holesCount) { this.holesCount = holesCount; }
}
