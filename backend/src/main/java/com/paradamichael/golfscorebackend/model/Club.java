package com.paradamichael.golfscorebackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "clubs")
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String clubName;
    private String clubType;
    private Integer carryDistance;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getClubName() { return clubName; }
    public void setClubName(String clubName) { this.clubName = clubName; }
    public String getClubType() { return clubType; }
    public void setClubType(String clubType) { this.clubType = clubType; }
    public Integer getCarryDistance() { return carryDistance; }
    public void setCarryDistance(Integer carryDistance) { this.carryDistance = carryDistance; }
}
