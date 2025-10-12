import Color from "./ColorEnum";
import Country from "./CountryEnum";

interface PersonDTO {
    id?: number;
    name: string;
    coordinatesId: number;
    creationDate?: Date;
    eyeColor?: Color;
    hairColor: Color;
    locationId?: number;
    height: number;
    birthday: Date;
    weight?: number;
    nationality: Country;
}

export default PersonDTO;