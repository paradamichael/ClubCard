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
    private Integer championshipYardage;
    private Integer tournamentYardage;
    private Integer playersYardage;
    private Integer gentlemenYardage;
    private Integer forwardYardage;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public Integer getHoleNumber() { return holeNumber; }
    public void setHoleNumber(Integer holeNumber) { this.holeNumber = holeNumber; }
    public Integer getPar() { return par; }
    public void setPar(Integer par) { this.par = par; }
    public Integer getChampionshipYardage() { return championshipYardage; }
    public void setChampionshipYardage(Integer championshipYardage) { this.championshipYardage = championshipYardage; }
    public Integer getTournamentYardage() { return tournamentYardage; }
    public void setTournamentYardage(Integer tournamentYardage) { this.tournamentYardage = tournamentYardage; }
    public Integer getPlayersYardage() { return playersYardage; }
    public void setPlayersYardage(Integer playersYardage) { this.playersYardage = playersYardage; }
    public Integer getGentlemenYardage() { return gentlemenYardage; }
    public void setGentlemenYardage(Integer gentlemenYardage) { this.gentlemenYardage = gentlemenYardage; }
    public Integer getForwardYardage() { return forwardYardage; }
    public void setForwardYardage(Integer forwardYardage) { this.forwardYardage = forwardYardage; }
}
