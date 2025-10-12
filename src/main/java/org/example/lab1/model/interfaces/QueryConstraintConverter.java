package org.example.lab1.model.interfaces;

import org.example.lab1.entities.dto.FilterOption;
import org.hibernate.query.Query;

public interface QueryConstraintConverter<T, S> {
    Query<T> buildQuery(S helpObj, StringBuilder defaultQuery, String alias, Class currClass, FilterOption... constraints);
}
