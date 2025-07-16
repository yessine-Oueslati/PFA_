package com.example.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.ResponseEntity;

// DTO for updating user role and entity
class UpdateUserRoleRequest {
    public String role;
    public String secteur;
    public String zone;
    public String region;
}

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable Integer id, @RequestBody UpdateUserRoleRequest request) {
        User user = userRepository.findById(id).orElseThrow();
        user.setRole(Role.valueOf(request.role));
        user.setSecteur(request.secteur);
        user.setZone(request.zone);
        user.setRegion(request.region);
        return ResponseEntity.ok(userRepository.save(user));
    }
} 