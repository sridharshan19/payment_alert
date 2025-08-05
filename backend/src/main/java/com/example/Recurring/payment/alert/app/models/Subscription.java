package com.example.Recurring.payment.alert.app.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceName;
    private double amount;
    private String frequency; // "MONTHLY", "YEARLY", etc.
    private LocalDate nextPaymentDate;

    @ManyToOne
    @JsonBackReference
    private User user;


}
