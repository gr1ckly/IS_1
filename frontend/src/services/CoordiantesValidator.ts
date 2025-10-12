import CoordinatesDTO from "../dtos/CoordinatesDTO";

class CoordiantesValidator {
    public static checkCoordinates(dto: CoordinatesDTO) : {correct: boolean, messages: string[]} {
        var messages: string[] = [];
        var correct: boolean = true;
        if (dto.x != undefined && dto.x > -459.0) {
            messages.push('X меньше или равен 459');
            correct = false;
        }

        if (dto.y == undefined) {
            messages.push("Y обязательно для ввода");
            correct = false;
        } else if (dto.y <= -238) {
            messages.push("Y меньше или равен -238");
            correct = false;
        }

        return {correct, messages};
    }
}

export default CoordiantesValidator;