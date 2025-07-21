package com.example.backend.resource;

import com.example.backend.model.Region;
import com.example.backend.service.RegionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/regions")
public class RegionResource {
    private final RegionService regionService;

    public RegionResource(RegionService regionService) {
        this.regionService = regionService;
    }

    @PostMapping("/add/{zoneId}")
    public ResponseEntity<Region> addRegion(@RequestBody Region region, @PathVariable("zoneId") Long zoneId) {
        Region newRegion = regionService.addRegion(region, zoneId);
        return new ResponseEntity<>(newRegion, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Region>> getAllRegions() {
        List<Region> regions = regionService.getAllRegions();
        return new ResponseEntity<>(regions, HttpStatus.OK);
    }
} 