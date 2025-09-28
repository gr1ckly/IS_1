package org.example.lab_1.model.interfaces;

import org.example.lab_1.model.FilterOption;
import org.hibernate.query.Query;

public interface QueryConstraintConverter<T, S> {
    Query<T> buildQuery(S helpObj, StringBuilder defaultQuery, String alias, Class currClass, FilterOption... constraints);
}
