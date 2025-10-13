import {useState} from "react";
import FilterOption from "../../dtos/FilterOption";
import OperationType from "../../dtos/OperationType";
import PersonService from "../../services/PersonService";
import Color from "../../dtos/ColorEnum";
import styles from "../../styles/EyesColor.module.css";

export default function EyesColor() {
    var [selectedColor, setSelectedColor] = useState<Color | undefined>(undefined);
    var [message, setMessage] = useState("");

    const handleCount = async () => {
        if (!selectedColor) {
          setMessage("Пожалуйста, выберите color");
          return
        }
        else console.log("Считаем % всех с eyesColor = ", selectedColor)
        var allPeopleNumber: number = await PersonService.getCount();
        if (allPeopleNumber === -1) {
            setMessage(`Ошибка при подсчете % с eyesColor = ${selectedColor.toString()} `);
            return
        } else if (allPeopleNumber === 0) {
            setMessage(`Пока не создано ни одного объекта Person`);
            return
        }
        const currFilter: FilterOption = {fieldName: "eye_color", operationType: OperationType.EQUAL, value: Color[selectedColor].toString()};
        console.log(currFilter.value);
        var selectNumber: number = await PersonService.getCount(currFilter);
        console.log(selectNumber);
        if (selectNumber === -1) {
            setMessage(`Ошибка при подсчете % с eyesColor = ${selectedColor.toString()} `);
        } else {
            setMessage(`Объектов с eyesColor = ${selectedColor.toString()} : ${(selectNumber / allPeopleNumber * 100).toFixed(2)}%`);
        }
        setSelectedColor(undefined);
    }

    return (
        <div className={styles.container}>
            <label className={styles.label}>Посчитать % людей с определенным цветом глаз</label>
            <label className={styles.label}>Выберите цвет глаз:</label>
            <select
                id="color"
                className={styles.select}
                value={selectedColor ?? ""}
                onChange={(e) => {
                    setSelectedColor(e.target.value as unknown as Color);
                    if (e.target.value !== "") setMessage("");
                }}
            >
                <option value="">— выберите —</option>
                {Object.values(Color).filter((v) => typeof v === "string").map((n) => (
                    <option key={n} value={n}>
                        {n}
                    </option>
                ))}
            </select>

            {message && <label className={styles.message}>{message}</label>}

            <button className={styles.button} onClick={handleCount}>
                Посчитать
            </button>
        </div>
    );
}