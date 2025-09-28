package org.example.lab_1.model.interfaces;

import org.example.lab_1.entities.dao.Person;
import org.example.lab_1.model.FilterOption;

import java.util.List;

public interface PersonStorage {
    long createPerson(Person person) throws Exception;
    Person getPersonByID(long id) throws Exception;
    int getCount(FilterOption... options) throws Exception;
    List<Person> searchPersons(int offset, int limit, FilterOption... options) throws Exception;
    int updatePerson(long id, Person newPerson) throws Exception;
    int deletePersonByFilter(FilterOption... options) throws Exception;
}
