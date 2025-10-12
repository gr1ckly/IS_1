package org.example.lab1.controller;

import org.example.lab1.entities.dao.Coordinates;
import org.example.lab1.entities.dto.CoordinatesDTO;
import org.example.lab1.entities.dto.FilterOption;
import org.example.lab1.exceptions.BadDataException;
import org.example.lab1.model.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/coordinates")
public class CoordinatesController {
    @Autowired
    private StorageService storageService;

    @PostMapping("/get_count")
    public ResponseEntity<Integer> getCountCoordinates(@RequestBody(required = false) FilterOption... options) {
        try{
            return ResponseEntity.ok(this.storageService.getCoordinatesCount(options));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/search_coordinates")
    public ResponseEntity<List<CoordinatesDTO>> searchCoordinates(@RequestParam int offset, @RequestParam int limit, @RequestBody(required = false) FilterOption... options) {
        try {
            List<Coordinates> coordinates = this.storageService.searchCoordinates(offset, limit, options);
            List<CoordinatesDTO> dtos  = new LinkedList<>();
            for  (Coordinates coord : coordinates) {
                dtos.add(coord.toDTO());
            }
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/create_coordinates")
    public ResponseEntity<Long>  createCoordinates(@RequestBody CoordinatesDTO coordinatesDTO) {
        try{
            return ResponseEntity.ok(this.storageService.createCoordinates(coordinatesDTO.toDAO()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoordinatesDTO> getCoordinatesById(@PathVariable("id") long id) {
        try {
            Coordinates currCoords  = this.storageService.getCoordinatesById(id);
            if (currCoords != null) {
                return ResponseEntity.ok(currCoords.toDTO());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Integer> updateCoordinates(@PathVariable("id") long id, @RequestBody CoordinatesDTO coordinatesDTO) {
        try{
            return ResponseEntity.ok(this.storageService.updateCoordinates(id, coordinatesDTO.toDAO()));
        } catch (BadDataException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteLocation(@PathVariable("id") long id) {
        try{
            return ResponseEntity.ok(this.storageService.deleteCoordinates(id));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
