import Color from "./ColorEnum";
import Country from "./CountryEnum";

interface PersonDTO {
    id?: number;
    name: string;
    coordinatesId: number;
    creationDate?: string;
    eyeColor?: Color;
    hairColor: Color;
    locationId?: number;
    height: number;
    birthday: string;
    weight?: number;
    nationality: Country;
}

export default PersonDTO;