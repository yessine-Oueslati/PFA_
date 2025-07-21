package com.example.backend.resource;

import com.example.backend.model.Secteur;
import com.example.backend.service.SecteurService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/secteurs")
public class SecteurResource {
    private final SecteurService secteurService;

    public SecteurResource(SecteurService secteurService) {
        this.secteurService = secteurService;
    }

    @PostMapping("/add/{regionId}/{zoneId}")
    public ResponseEntity<Secteur> addSecteur(@RequestBody Secteur secteur, @PathVariable("regionId") Long regionId, @PathVariable("zoneId") Long zoneId) {
        Secteur newSecteur = secteurService.addSecteur(secteur, regionId, zoneId);
        return new ResponseEntity<>(newSecteur, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Secteur>> getAllSecteurs() {
        List<Secteur> secteurs = secteurService.getAllSecteurs();
        return new ResponseEntity<>(secteurs, HttpStatus.OK);
    }
} 