package com.example.backend.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo-Controller")

public class DemoController {
    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello World");
    }
}
