package com.example.backend.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "regions")
public class Region implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "chef_region", nullable = false)
    private String chefRegion;

    @ManyToOne
    @JoinColumn(name = "zone_id", nullable = false)
    private Zone zone;

    public Region() {}

    public Region(String name, String chefRegion, Zone zone) {
        this.name = name;
        this.chefRegion = chefRegion;
        this.zone = zone;
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

    public String getChefRegion() {
        return chefRegion;
    }

    public void setChefRegion(String chefRegion) {
        this.chefRegion = chefRegion;
    }

    public Zone getZone() {
        return zone;
    }

    public void setZone(Zone zone) {
        this.zone = zone;
    }
} 