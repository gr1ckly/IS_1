import LocationDTO from "../dtos/LocationDTO";

class LocationValidator {
    public static checkLocation(dto: LocationDTO) : {correct: boolean, messages: string[]} {
        var messages: string[] = [];
        var correct = true;

        if (dto.x == undefined) {
            messages.push("Поле X обязательно для ввода");
            correct = false;
        }

        if (dto.y == undefined) {
            messages.push("Поле Y обязательно для ввода");
            correct = false;
        }

        if (dto.name != undefined && dto.name.length > 871) {
            messages.push("Поле Name должно быть короче 871 символа")
            correct = false;
        }

        return {correct, messages};
    }
}

export default LocationValidator;