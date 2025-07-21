package com.example.backend.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "secteurs")
public class Secteur implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "chef_secteur", nullable = false)
    private String chefSecteur;

    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    @ManyToOne
    @JoinColumn(name = "zone_id", nullable = false)
    private Zone zone;

    public Secteur() {}

    public Secteur(String name, String chefSecteur, Region region, Zone zone) {
        this.name = name;
        this.chefSecteur = chefSecteur;
        this.region = region;
        this.zone = zone;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getChefSecteur() { return chefSecteur; }
    public void setChefSecteur(String chefSecteur) { this.chefSecteur = chefSecteur; }
    public Region getRegion() { return region; }
    public void setRegion(Region region) { this.region = region; }
    public Zone getZone() { return zone; }
    public void setZone(Zone zone) { this.zone = zone; }
} 