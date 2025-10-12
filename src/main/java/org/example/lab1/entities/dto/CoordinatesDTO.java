package org.example.lab1.entities.dto;

import org.example.lab1.entities.dao.Coordinates;

public record CoordinatesDTO(long id,
                             double x,
                             Integer y) {
    public Coordinates toDAO() {
        return new Coordinates(id, x, y);
    }
}
