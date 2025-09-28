package org.example.lab_1.model.interfaces;

import org.example.lab_1.entities.dao.Coordinates;
import org.example.lab_1.model.FilterOption;

import java.util.List;

public interface CoordinatesStorage {
    long createCoordinates(Coordinates coords) throws Exception;
    Coordinates getCoordinatesByID(long id) throws Exception;
    int getCount(FilterOption... options) throws Exception;
    List<Coordinates> searchCoordinates(int offset, int limit, FilterOption... options) throws Exception;
    int updateCoordinates(long id, Coordinates newCoords) throws Exception;
    int deleteCoordinates(long id) throws Exception;
}
