package com.example.Recurring.payment.alert.app.repositories;

import com.example.Recurring.payment.alert.app.models.Subscription;
import com.example.Recurring.payment.alert.app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByUser(User user);
}