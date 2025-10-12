import {useState} from "react";
import Country from "../../dtos/CountryEnum";
import FilterOption from "../../dtos/FilterOption";
import OperationType from "../../dtos/OperationType";
import PersonService from "../../services/PersonService";
import styles from "../../styles/LessNationality.module.css"

export default function LessNationality() {
    var [selectedNationality, setSelectedNationality] = useState<Country | undefined>(undefined);
    var [message, setMessage] = useState("");

    const handleCount = async () => {
        if (!selectedNationality) {
            setMessage("Пожалуйста, выберите nationality");
            return
        }
        else console.log("Считаем всех с nationality <", selectedNationality)
        const currFilter: FilterOption = {fieldName: "nationality", operationType: OperationType.LESS, value: selectedNationality.valueOf().toString()};
        var selectNumber: number = await PersonService.getCount(currFilter);
        if (!selectNumber || selectNumber === -1) {
            setMessage(`Ошибка при подсчете объектов с nationality < ${selectedNationality.toString()} `);
        } else {
            setMessage(`Объектов с nationality < ${selectedNationality.toString()} : ${selectNumber}`);
        }
        setSelectedNationality(undefined);
    }

    return (
        <div className={styles.container}>
            <label className={styles.label}>Выберите национальность:</label>
            <select
                id="nationality"
                className={styles.select}
                value={selectedNationality}
                onChange={(e) => {
                    setSelectedNationality(e.target.value as unknown as Country);
                    if (e.target.value !== "") setMessage("");
                }}
            >
                <option value="">— выберите —</option>
                {Object.values(Country).map((n) => (
                    <option key={n} value={n}>
                        {n}
                    </option>
                ))}
            </select>

            <button className={styles.button} onClick={handleCount}>
                Посчитать
            </button>

            {message !== "" && <label className={styles.message}>{message}</label>}
        </div>
    );
}