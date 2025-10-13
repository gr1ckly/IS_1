package org.example.lab1.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.lab1.entities.dao.Coordinates;
import org.example.lab1.entities.dao.Location;
import org.example.lab1.entities.dao.Person;
import org.example.lab1.entities.dto.FilterOption;
import org.example.lab1.exceptions.BadDataException;
import org.example.lab1.model.interfaces.CoordinatesStorage;
import org.example.lab1.model.interfaces.LocationStorage;
import org.example.lab1.model.interfaces.PersonStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StorageService {

    @Autowired
    private PersonStorage personStorage;

    @Autowired
    private LocationStorage locationStorage;

    @Autowired
    private CoordinatesStorage coordinatesStorage;

    @Autowired
    private NotificationService notificationService;

    public long createPerson(Person newPerson, Long locationId, long coordinatesId) throws Exception {
        if (locationId != null && locationId > 0) {
            Location currLocation = this.locationStorage.getLocationByID(locationId);
            if (currLocation == null) {
                throw new BadDataException("Location not found");
            }
            newPerson.setLocation(currLocation);
        }
        Coordinates currCoords = this.coordinatesStorage.getCoordinatesByID(coordinatesId);
        if (currCoords == null) {
            throw new BadDataException("Coordinates not found");
        }
        newPerson.setCoordinates(currCoords);
        notificationService.sendMessage("update");
        return this.personStorage.createPerson(newPerson);
    }

    public Person getPersonById(long id) throws Exception {
        return this.personStorage.getPersonByID(id);
    }

    public int getPersonCount(FilterOption... options) throws Exception {
        return this.personStorage.getCount(options);
    }

    public List<Person> searchPersons(int offset, int limit, FilterOption... options) throws Exception{
        return this.personStorage.searchPersons(offset, limit, options);
    }

    public int updatePerson(long id, Person newPerson, Long locationId, long coordinatesId) throws Exception {
        if (locationId != null && locationId > 0) {
            Location currLocation = this.locationStorage.getLocationByID(locationId);
            if (currLocation == null) {
                throw new BadDataException("Location not found");
            }
            newPerson.setLocation(currLocation);
        }
        Coordinates currCoords = this.coordinatesStorage.getCoordinatesByID(coordinatesId);
        if (currCoords == null) {
            throw new BadDataException("Coordinates not found");
        }
        newPerson.setCoordinates(currCoords);
        notificationService.sendMessage("update");
        return this.personStorage.updatePerson(id, newPerson);
    }

    public int deletePersonsByFilters(FilterOption... options) throws Exception {
        notificationService.sendMessage("update");
        return this.personStorage.deletePersonByFilter(options);
    }

    public long createLocation(Location newLocation) throws Exception {
        notificationService.sendMessage("update");
        return this.locationStorage.createLocation(newLocation);
    }

    public Location getLocationById(long id) throws Exception {
        return this.locationStorage.getLocationByID(id);
    }

    public int getLocationCount(FilterOption... options) throws Exception {
        return this.locationStorage.getCount(options);
    }

    public List<Location> searchLocations(int offset, int limit, FilterOption... options) throws Exception{
        return this.locationStorage.searchLocations(offset, limit, options);
    }

    public int updateLocation(long id, Location newLocation) throws Exception {
        notificationService.sendMessage("update");
        return this.locationStorage.updateLocation(id, newLocation);
    }

    public int deleteLocation(long id) throws Exception {
        notificationService.sendMessage("update");
        return this.locationStorage.deleteLocation(id);
    }

    public long createCoordinates(Coordinates newCoordinates) throws Exception {
        notificationService.sendMessage("update");
        return this.coordinatesStorage.createCoordinates(newCoordinates);
    }

    public Coordinates getCoordinatesById(long id) throws Exception {
        return this.coordinatesStorage.getCoordinatesByID(id);
    }

    public int getCoordinatesCount(FilterOption... options) throws Exception {
        return this.coordinatesStorage.getCount(options);
    }

    public List<Coordinates> searchCoordinates(int offset, int limit, FilterOption... options) throws Exception{
        return this.coordinatesStorage.searchCoordinates(offset, limit, options);
    }

    public int updateCoordinates(long id, Coordinates newCoordinates) throws Exception {
        notificationService.sendMessage("update");
        return this.coordinatesStorage.updateCoordinates(id, newCoordinates);
    }

    public int deleteCoordinates(long id) throws Exception {
        notificationService.sendMessage("update");
        return this.coordinatesStorage.deleteCoordinates(id);
    }
}

