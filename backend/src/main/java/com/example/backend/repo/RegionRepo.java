package com.example.backend.repo;

import com.example.backend.model.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepo extends JpaRepository<Region, Long> {
} 