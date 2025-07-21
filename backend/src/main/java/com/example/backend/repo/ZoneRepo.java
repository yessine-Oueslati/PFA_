package com.example.backend.repo;

import com.example.backend.model.Zone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ZoneRepo extends JpaRepository<Zone, Long> {
    Optional<Zone> findZoneById(Long id);
} 