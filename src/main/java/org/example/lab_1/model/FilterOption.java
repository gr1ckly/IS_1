package org.example.lab_1.model;

public record FilterOption(String fieldName,
                           boolean sorted,
                           boolean desc,
                           boolean greater,
                           boolean less,
                           boolean equal,
                           String value) {}
