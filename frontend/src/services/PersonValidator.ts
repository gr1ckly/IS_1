import PersonDTO from "../dtos/PersonDTO";
import CoordinatesService from "./CoordinatesService";

class PersonValidator{
    public static async checkPerson(dto: PersonDTO) : Promise<{correct: boolean, messages: string[]}> {
        var messages: string[] = [];
        var correct = true;

        if (dto.name == undefined) {
            messages.push("Поле Name обязательно для ввода");
            correct = false;
        } else if (dto.name == "") {
            messages.push("Поле Name не должно быть пустым");
            correct = false;
        }

        if (dto.coordinatesId == undefined) {
            messages.push("Поле Coordinates ID обязательно для ввода");
            correct = false;
        } else if (await CoordinatesService.getCoordinatesByID(dto.coordinatesId) != undefined) {
            messages.push("Не существует Coordinates с данным id: " + dto.coordinatesId);
            correct = false;
        }

        return {correct, messages};
    }
}

export default PersonValidator;