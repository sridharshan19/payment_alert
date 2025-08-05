package com.example.Recurring.payment.alert.app.services;

import com.example.Recurring.payment.alert.app.dto.*;
import com.example.Recurring.payment.alert.app.models.User;
import com.example.Recurring.payment.alert.app.repositories.UserRepository;
import com.example.Recurring.payment.alert.app.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired private UserRepository userRepository;
    @Autowired private JwtService jwtService;
    @Autowired private AuthenticationManager authManager;
    @Autowired private PasswordEncoder passwordEncoder;

    public AuthResponse register(AuthRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getEmail().split("@")[0]);
        userRepository.save(user);
        return new AuthResponse(jwtService.generateToken(user.getEmail()));
    }

    public AuthResponse login(AuthRequest request) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        return new AuthResponse(jwtService.generateToken(request.getEmail()));
    }
    @Autowired
    private EmailService emailService;

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String subject = "Login Alert - Recurring Payment App";
        String message = "Hi " + user.getUsername() + ",\n\n" +
                "You have successfully logged in on: " + java.time.LocalDateTime.now() +
                "\n\nIf this wasn't you, please contact support.";

        emailService.sendAlert(user.getEmail(), subject, message);

        String token = jwtService.generateToken(email);
        return token;
    }

}
