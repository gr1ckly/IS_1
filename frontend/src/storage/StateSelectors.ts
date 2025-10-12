import AppState from "./states/AppState";
import PersonDTO from "../dtos/PersonDTO";
import LocationDTO from "../dtos/LocationDTO";
import CoordinatesDTO from "../dtos/CoordinatesDTO";

export const selectUpdatedPerson = (state: AppState): PersonDTO | undefined => {
    return state.updatedPerson;
};

export const selectUpdatedLocation = (state: AppState): LocationDTO | undefined => {
    return state.updatedLocation;
};

export const selectUpdatedCoordinates = (state: AppState): CoordinatesDTO | undefined => {
    return state.updatedCoordinates;
};

export const selectCreatePerson = (state: AppState): boolean | undefined => {
    return state.createPerson;
};

export const selectCreateLocation = (state: AppState): boolean | undefined => {
    return state.createLocation;
};

export const selectCreateCoordinates = (state: AppState): boolean | undefined => {
    return state.createCoordinates;
};