package org.example.lab1.entities.dto;

public record FilterOption(String fieldName,
                           OperationType operationType,
                           String value) {}
