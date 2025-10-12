package org.example.lab1.entities.dto;

import org.example.lab1.entities.dao.Color;
import org.example.lab1.entities.dao.Country;
import org.example.lab1.entities.dao.Person;

public record PersonDTO(long id,
                        String name,
                        long coordinatesId,
                        java.util.Date creationDate,
                        Color eyeColor,
                        Color hairColor,
                        long locationId,
                        Float height,
                        java.time.LocalDateTime birthday,
                        Float weight,
                        Country nationality){
    public Person toDAO() {
        Person newPerson =  new Person();
        newPerson.setId(id);
        newPerson.setName(name);
        newPerson.setCreationDate(creationDate);
        newPerson.setEyeColor(eyeColor);
        newPerson.setHairColor(hairColor);
        newPerson.setHeight(height);
        newPerson.setWeight(weight);
        newPerson.setBirthday(birthday);
        newPerson.setNationality(nationality);
        return newPerson;
    }

}
