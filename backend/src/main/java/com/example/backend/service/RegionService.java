package com.example.backend.service;

import com.example.backend.model.Region;
import com.example.backend.model.Zone;
import com.example.backend.repo.RegionRepo;
import com.example.backend.repo.ZoneRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionService {
    private final RegionRepo regionRepo;
    private final ZoneRepo zoneRepo;

    @Autowired
    public RegionService(RegionRepo regionRepo, ZoneRepo zoneRepo) {
        this.regionRepo = regionRepo;
        this.zoneRepo = zoneRepo;
    }

    public Region addRegion(Region region, Long zoneId) {
        Zone zone = zoneRepo.findZoneById(zoneId)
                .orElseThrow(() -> new IllegalStateException("Zone with id " + zoneId + " does not exist"));
        region.setZone(zone);
        return regionRepo.save(region);
    }

    public List<Region> getAllRegions() {
        return regionRepo.findAll();
    }
} 