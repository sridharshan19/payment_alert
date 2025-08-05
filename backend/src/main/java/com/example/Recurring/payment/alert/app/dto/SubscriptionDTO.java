package com.example.Recurring.payment.alert.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionDTO {
    private String serviceName;
    private double amount;
    private String frequency;
    private LocalDate nextPaymentDate;

}

