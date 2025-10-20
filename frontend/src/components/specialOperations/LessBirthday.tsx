import {useState} from "react";
import FilterOption from "../../dtos/FilterOption";
import OperationType from "../../dtos/OperationType";
import PersonService from "../../services/PersonService";
import PersonTable from "../tables/PersonTable";
import TableState from "../../storage/states/TableState";
import styles from "../../styles/LessBirthday.module.css"

export default function LessBirthday() {
    const [tableState, setTableState] = useState<TableState | undefined>(undefined);
    const [birthday, setBirthday] = useState<string>("");
    const [message, setMessage] = useState("");

    const handleGet = async () => {
        if (birthday === "") {
            setMessage("Пожалуйста, введите корректный birthday");
            return
        }
        else console.log("Выводим всех с birthday <", birthday);
        const currFilter: FilterOption = {fieldName: "birthday", operationType: OperationType.LESS, value: birthday};
        const personNumber: number = await PersonService.getCount(currFilter);
        if (!personNumber || personNumber === -1) {
            setMessage(`Ошибка при выводе объектов с birthday < ${birthday} `);
            setBirthday("");
            return
        } else if (personNumber === 0) {
            setMessage(`Пока объектов Person не было создано`);
            setBirthday("");
            return
        }
        if (tableState === undefined) {
            setTableState({pageSize: 10, count:personNumber, currPage:1, filters: [currFilter]});
        }
    }

    return (
        <div className={styles.container}>
            <span className={styles.label}>Вывести людей, день рождения которых позже заданного</span>
            <span className={styles.label}>Введите день рождения:</span>
            <input
                type="date"
                className={styles.input}
                value={birthday}
                onChange={(e) => {
                    console.log(e.target.value);
                    setBirthday(e.target.value ? new Date(e.target.value).toISOString().split("T")[0] : "")}}
            />

            {message !== "" && <label className={styles.message}>{message}</label>}

            <button className={styles.button} onClick={handleGet}>
                Показать Person
            </button>

            {tableState && (
                <div className={styles.tableWrapper}>
                    <PersonTable
                        tableState={tableState}
                        onChangeTableState={setTableState}
                    />
                </div>
            )}
        </div>
    );
}