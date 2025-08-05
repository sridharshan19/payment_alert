package com.example.Recurring.payment.alert.app.services;

import com.example.Recurring.payment.alert.app.models.Subscription;
import com.example.Recurring.payment.alert.app.models.User;
import com.example.Recurring.payment.alert.app.repositories.SubscriptionRepository;
import com.example.Recurring.payment.alert.app.repositories.UserRepository;
import com.example.Recurring.payment.alert.app.dto.SubscriptionDTO;
import com.example.Recurring.payment.alert.app.models.*;
import com.example.Recurring.payment.alert.app.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.time.LocalDate;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserRepository userRepository;

    public Subscription addSubscription(SubscriptionDTO dto, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        Subscription sub = new Subscription();
        sub.setServiceName(dto.getServiceName());
        sub.setAmount(dto.getAmount());
        sub.setFrequency(dto.getFrequency());
        sub.setNextPaymentDate(dto.getNextPaymentDate());
        sub.setUser(user);
        return subscriptionRepository.save(sub);
    }

    public List<Subscription> getUserSubscriptions(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        return subscriptionRepository.findByUser(user);
    }
}
