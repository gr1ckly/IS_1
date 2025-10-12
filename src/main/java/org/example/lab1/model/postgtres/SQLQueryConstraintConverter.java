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
        defaultQuery.append(" WHERE");
        boolean isFirstConstraint = true;

        Map<String, Object> params = new HashMap<>();

        for (FilterOption filter : constraints) {
            if (!params.containsKey(filter.fieldName()) && filter.operationType() != OperationType.SORTED && filter.operationType() != OperationType.SORTED_DESC) {
                Object currValue = convertValue(filter.value());
                if (filter.operationType() == OperationType.GREATER) {
                    if (!isFirstConstraint) {
                        defaultQuery.append(" AND ");
                    } else {
                        defaultQuery.append(" WHERE ");
                    }
                    isFirstConstraint = false;
                    defaultQuery.append(alias).append(".").append(filter.value()).append(" > :").append(filter.value());
                    params.put(filter.fieldName(), currValue);
                } else if (filter.operationType() == OperationType.LESS) {
                    if (!isFirstConstraint) {
                        defaultQuery.append(" AND ");
                    } else {
                        defaultQuery.append(" WHERE ");
                    }
                    isFirstConstraint = false;
                    defaultQuery.append(alias).append(".").append(filter.value()).append(" < :").append(filter.value());
                    params.put(filter.fieldName(), currValue);
                } else if (filter.operationType() == OperationType.EQUAL) {
                    if (!isFirstConstraint) {
                        defaultQuery.append(" AND ");
                    } else {
                        defaultQuery.append(" WHERE ");
                    }
                    isFirstConstraint = false;
                    defaultQuery.append(alias).append(".").append(filter.value()).append(" = :").append(filter.value());
                    params.put(filter.fieldName(), currValue);
                }
            }
        }

        List<FilterOption> sortedFields = Arrays.stream(constraints).filter(f -> f.operationType() == OperationType.SORTED || f.operationType() == OperationType.SORTED_DESC).toList();

        if (!sortedFields.isEmpty()) {
            defaultQuery.append(" ORDER BY ");
            defaultQuery.append(sortedFields.stream()
                    .map(f -> alias + "." +f.fieldName() + (f.operationType() == OperationType.SORTED_DESC ? " DESC": ""))
                    .collect(Collectors.joining(", "))
            );
        }
        Query<T> query = session.createNativeQuery(defaultQuery.toString(), currClass);
        params.forEach(query::setParameter);
        return query;
    }

    private Object convertValue(String value) {
        if (value == null) return null;
        try {
            return Long.parseLong(value);
        } catch (Exception e) {}
        try {
            return Double.parseDouble(value);
        } catch (Exception e) {}
        try {
            return Date.parse(value);
        } catch (Exception e) {}
        try {
            return LocalDateTime.parse(value);
        } catch (Exception e) {}
        return value;
    }
}
