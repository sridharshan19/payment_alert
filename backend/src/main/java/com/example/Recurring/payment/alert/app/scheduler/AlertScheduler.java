package com.example.Recurring.payment.alert.app.scheduler;

import com.example.Recurring.payment.alert.app.models.Subscription;
import com.example.Recurring.payment.alert.app.repositories.SubscriptionRepository;
import com.example.Recurring.payment.alert.app.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class AlertScheduler {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private EmailService emailService;

    @Scheduled(fixedRate = 10000) // runs every 10 seconds

    public void sendAlerts() {
        LocalDate today = LocalDate.now();
        List<Subscription> dueSubscriptions = subscriptionRepository.findAll()
                .stream()
                .filter(sub -> sub.getNextPaymentDate().equals(today))
                .toList();

        for (Subscription sub : dueSubscriptions) {
            emailService.sendAlert(
                    sub.getUser().getEmail(),
                    "Payment Reminder for " + sub.getServiceName(),
                    "Your payment of ₹" + sub.getAmount() + " for " + sub.getServiceName() + " is due today."
            );

            // Update next payment date
            LocalDate nextDate = switch (sub.getFrequency().toUpperCase()) {
                case "MONTHLY" -> sub.getNextPaymentDate().plusMonths(1);
                case "YEARLY" -> sub.getNextPaymentDate().plusYears(1);
                default -> sub.getNextPaymentDate().plusDays(30); // fallback
            };
            sub.setNextPaymentDate(nextDate);
            subscriptionRepository.save(sub);
        }
    }
}

