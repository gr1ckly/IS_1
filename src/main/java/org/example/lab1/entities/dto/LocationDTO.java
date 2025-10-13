package org.example.lab1.entities.dto;

import org.example.lab1.entities.dao.Location;

public record LocationDTO(Long id,
                          Double x,
                          Float y,
                          String name) {
    public Location toDAO() {
        return new Location(this.id, this.x, this.y, this.name);
    }
}
