package com.example.backend.service;

import com.example.backend.model.Secteur;
import com.example.backend.model.Region;
import com.example.backend.model.Zone;
import com.example.backend.repo.SecteurRepo;
import com.example.backend.repo.RegionRepo;
import com.example.backend.repo.ZoneRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecteurService {
    private final SecteurRepo secteurRepo;
    private final RegionRepo regionRepo;
    private final ZoneRepo zoneRepo;

    @Autowired
    public SecteurService(SecteurRepo secteurRepo, RegionRepo regionRepo, ZoneRepo zoneRepo) {
        this.secteurRepo = secteurRepo;
        this.regionRepo = regionRepo;
        this.zoneRepo = zoneRepo;
    }

    public Secteur addSecteur(Secteur secteur, Long regionId, Long zoneId) {
        Region region = regionRepo.findById(regionId)
                .orElseThrow(() -> new IllegalStateException("Region with id " + regionId + " does not exist"));
        Zone zone = zoneRepo.findZoneById(zoneId)
                .orElseThrow(() -> new IllegalStateException("Zone with id " + zoneId + " does not exist"));
        secteur.setRegion(region);
        secteur.setZone(zone);
        return secteurRepo.save(secteur);
    }

    public List<Secteur> getAllSecteurs() {
        return secteurRepo.findAll();
    }
} 