package org.example.lab1.model.postgtres;

import org.example.lab1.entities.dto.FilterOption;
import org.example.lab1.entities.dto.OperationType;
import org.example.lab1.model.interfaces.QueryConstraintConverter;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class SQLQueryConstraintConverter<T> implements QueryConstraintConverter<T, Session> {

    @Override
    public Query<T> buildQuery(Session session, StringBuilder defaultQuery, String alias, Class currClass, FilterOption... constraints) {
        boolean isFirstConstraint = true;
        Map<String, Object> params = new HashMap<>();

        if (constraints != null) {
            for (FilterOption filter : constraints) {
                if (filter == null) continue;
                if (!params.containsKey(filter.fieldName()) &&
                        filter.operationType() != OperationType.SORTED &&
                        filter.operationType() != OperationType.SORTED_DESC) {

                    Object currValue = convertValue(filter.value());
                    String field = filter.fieldName();
                    if (field == null || field.isBlank()) continue;

                    if (!isFirstConstraint) defaultQuery.append(" AND ");
                    else defaultQuery.append(" WHERE ");
                    isFirstConstraint = false;

                    switch (filter.operationType()) {
                        case GREATER -> defaultQuery.append(alias).append('.').append(field).append(" > :").append(field);
                        case LESS -> defaultQuery.append(alias).append('.').append(field).append(" < :").append(field);
                        case EQUAL -> defaultQuery.append(alias).append('.').append(field).append(" = :").append(field);
                    }
                    params.put(field, currValue);
                }
            }
        }

        boolean isAggregateQuery = defaultQuery.toString().toLowerCase().contains("count(")
                || defaultQuery.toString().toLowerCase().contains("sum(")
                || defaultQuery.toString().toLowerCase().contains("avg(")
                || defaultQuery.toString().toLowerCase().contains("min(")
                || defaultQuery.toString().toLowerCase().contains("max(");

        if (!isAggregateQuery) {
            List<FilterOption> sortedFields = constraints == null ? List.of()
                    : Arrays.stream(constraints)
                    .filter(f -> f.operationType() == OperationType.SORTED || f.operationType() == OperationType.SORTED_DESC)
                    .toList();

            if (!sortedFields.isEmpty()) {
                defaultQuery.append(" ORDER BY ");
                defaultQuery.append(sortedFields.stream()
                        .map(f -> alias + "." + f.fieldName() + (f.operationType() == OperationType.SORTED_DESC ? " DESC" : ""))
                        .collect(Collectors.joining(", ")));
            }
        }

        Query<T> query = currClass != null
                ? session.createNativeQuery(defaultQuery.toString(), currClass)
                : session.createNativeQuery(defaultQuery.toString());

        params.forEach((k, v) -> {
            try { query.setParameter(k, v); } catch (Exception ignored) {}
        });
        return query;
    }

    private Object convertValue(String value) {
        if (value == null) return null;
        if (value.matches("^-?\\d+\\.\\d+$")) {
            return Double.parseDouble(value);
        }
        if (value.matches("^-?\\d+$")) {
            try {
                return Long.parseLong(value);
            } catch (NumberFormatException e) {
                return value;
            }
        }
        try {
            return LocalDateTime.parse(value);
        } catch (Exception ignored) {}
        return value;
    }

}
