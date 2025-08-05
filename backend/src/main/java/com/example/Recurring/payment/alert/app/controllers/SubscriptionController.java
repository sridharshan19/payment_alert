package com.example.Recurring.payment.alert.app.controllers;
import com.example.Recurring.payment.alert.app.dto.SubscriptionDTO;
import com.example.Recurring.payment.alert.app.models.Subscription;
import com.example.Recurring.payment.alert.app.services.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping
    public Subscription add(@RequestBody SubscriptionDTO dto,
                            @AuthenticationPrincipal UserDetails user) {
        return subscriptionService.addSubscription(dto, user.getUsername());
    }

    @GetMapping
    public ResponseEntity<List<Subscription>> getSubscriptions(@AuthenticationPrincipal UserDetails user) {
        List<Subscription> subs = subscriptionService.getUserSubscriptions(user.getUsername());
        return ResponseEntity.ok(subs);
    }

}