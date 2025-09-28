package org.example.lab_1.entities.dto;

import org.example.lab_1.entities.dao.Coordinates;

public record CoordinatesDTO(long id,
                             double x,
                             Integer y) {
    public Coordinates toDAO() {
        return new Coordinates(id, x, y);
    }
}
