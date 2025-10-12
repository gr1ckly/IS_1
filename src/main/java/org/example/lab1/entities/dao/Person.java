package org.example.lab1.entities.dao;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.lab1.entities.dto.PersonDTO;
import org.hibernate.annotations.*;
import jakarta.persistence.Table;

@Entity
@Table(name = "person")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Person {
    @Id
    @Column(
            name = "id",
            unique = true,
            nullable = false
    )
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Check(constraints = "id > 0")
    private long id; //Значение поля должно быть больше 0, Значение этого поля должно быть уникальным, Значение этого поля должно генерироваться автоматически

    @Column(name = "name",nullable = false)
    @Check(constraints = "name != ''")
    private String name; //Поле не может быть null, Строка не может быть пустой

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coordinates_id", nullable = false)
    private Coordinates coordinates; //Поле не может быть null

    @Column(name = "creation_date", nullable = false)
    @Generated
    private java.util.Date creationDate; //Поле не может быть null, Значение этого поля должно генерироваться автоматически

    @Column(name = "eye_color")
    @Enumerated(EnumType.ORDINAL)
    private Color eyeColor; //Поле может быть null

    @Column(name = "hair_color",nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private Color hairColor; //Поле не может быть null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location; //Поле может быть null

    @Column(name = "height",nullable = false)
    @Check(constraints = "height > 0")
    private Float height; //Поле не может быть null, Значение поля должно быть больше 0

    @Column(name = "birthday",nullable = false)
    private java.time.LocalDateTime birthday; //Поле не может быть null

    @Column(name = "weight")
    @Check(constraints = "weight > 0")
    private Float weight; //Поле может быть null, Значение поля должно быть больше 0

    @Column(name = "nationality", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private Country nationality; //Поле не может быть null

    public PersonDTO toDTO() {
        return new PersonDTO(this.id, this.name, this.coordinates.getId(), this.creationDate, this.eyeColor, this.hairColor, this.location.getId(), this.height, this.birthday, this.weight, this.nationality);
    }
}
