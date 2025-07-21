package com.example.backend.resource;

import com.example.backend.model.Zone;
import com.example.backend.service.ZoneService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/zones")
public class ZoneResource {
    private final ZoneService zoneService;

    public ZoneResource(ZoneService zoneService) {
        this.zoneService = zoneService;
    }

    @PostMapping("/add")
    public ResponseEntity<Zone> addZone(@RequestBody Zone zone) {
        Zone newZone = zoneService.addZone(zone);
        return new ResponseEntity<>(newZone, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Zone>> getAllZones() {
        List<Zone> zones = zoneService.getAllZones();
        return new ResponseEntity<>(zones, HttpStatus.OK);
    }
} 