package com.example.backend.service;

import com.example.backend.model.Zone;
import com.example.backend.repo.ZoneRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZoneService {
    private final ZoneRepo zoneRepo;

    @Autowired
    public ZoneService(ZoneRepo zoneRepo) {
        this.zoneRepo = zoneRepo;
    }

    public Zone addZone(Zone zone) {
        return zoneRepo.save(zone);
    }

    public List<Zone> getAllZones() {
        return zoneRepo.findAll();
    }
} 