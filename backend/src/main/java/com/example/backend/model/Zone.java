package com.example.backend.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "zones")
public class Zone implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "chef_zone", nullable = false)
    private String chefZone;

    public Zone() {}

    public Zone(String name, String chefZone) {
        this.name = name;
        this.chefZone = chefZone;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getChefZone() {
        return chefZone;
    }

    public void setChefZone(String chefZone) {
        this.chefZone = chefZone;
    }

    @Override
    public String toString() {
        return "Zone{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", chefZone='" + chefZone + '\'' +
                '}';
    }
} 