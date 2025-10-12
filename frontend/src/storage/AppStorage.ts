import {Action, createStore, Reducer} from "@reduxjs/toolkit";
import AppState from "./states/AppState";
import TableState from "./states/TableState";
import AppAction from "./Action";
import {
    CLEAR_ALL, COPY_STATE,
    SET_CREATE_COORDINATES, SET_CREATE_LOCATION, SET_CREATE_PERSON,
    SET_UPDATE_COORDINATES,
    SET_UPDATE_LOCATION,
    SET_UPDATE_PERSON

} from "../consts/StateConsts";
import PersonDTO from "../dtos/PersonDTO";
import LocationDTO from "../dtos/LocationDTO";
import CoordinatesDTO from "../dtos/CoordinatesDTO";

export const defaultState: AppState = {
    createCoordinates: false,
    createLocation: false,
    createPerson: false,
};

const reducer: Reducer<AppState, AppAction<PersonDTO | LocationDTO | CoordinatesDTO | boolean>> = (state: AppState = defaultState, action: AppAction<PersonDTO | LocationDTO | CoordinatesDTO | boolean>): AppState => {
    switch (action.type){
        case SET_UPDATE_PERSON:
            return {...defaultState, updatedPerson: action.payload as PersonDTO};
        case SET_UPDATE_LOCATION:
            return {...defaultState, updatedLocation: action.payload as LocationDTO};
        case SET_UPDATE_COORDINATES:
            return {...defaultState, updatedCoordinates: action.payload as CoordinatesDTO};
        case SET_CREATE_COORDINATES:
            return {...defaultState, createCoordinates: action.payload as boolean};
        case SET_CREATE_LOCATION:
            return {...defaultState, createLocation: action.payload as boolean};
        case SET_CREATE_PERSON:
            return {...defaultState, createPerson: action.payload as boolean};
        case CLEAR_ALL:
            return defaultState;
        case COPY_STATE:
            return {...state};
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;