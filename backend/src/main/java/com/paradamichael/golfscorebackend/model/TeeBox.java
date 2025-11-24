package com.paradamichael.golfscorebackend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "tee_boxes")
public class TeeBox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private String teeName;
    private String teeColor;
    private BigDecimal rating;
    private Integer slope;
    private Integer totalYardage;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public String getTeeName() { return teeName; }
    public void setTeeName(String teeName) { this.teeName = teeName; }
    public String getTeeColor() { return teeColor; }
    public void setTeeColor(String teeColor) { this.teeColor = teeColor; }
    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }
    public Integer getSlope() { return slope; }
    public void setSlope(Integer slope) { this.slope = slope; }
    public Integer getTotalYardage() { return totalYardage; }
    public void setTotalYardage(Integer totalYardage) { this.totalYardage = totalYardage; }
}
