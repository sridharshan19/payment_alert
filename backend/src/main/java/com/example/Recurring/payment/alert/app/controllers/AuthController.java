package com.example.Recurring.payment.alert.app.controllers;

import com.example.Recurring.payment.alert.app.dto.AuthRequest;
import com.example.Recurring.payment.alert.app.dto.AuthResponse;
import com.example.Recurring.payment.alert.app.dto.*;
import com.example.Recurring.payment.alert.app.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired private AuthService authService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody AuthRequest request) {
        return authService.register(request);
    }
}
