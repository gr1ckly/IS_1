import {useState} from "react";
import FilterOption from "../../dtos/FilterOption";
import OperationType from "../../dtos/OperationType";
import PersonService from "../../services/PersonService";
import PersonTable from "../tables/PersonTable";
import TableState from "../../storage/states/TableState";
import styles from "../../styles/LessBirthday.module.css"

export default function LessBirthday() {
    var [tableState, setTableState] = useState<TableState | undefined>(undefined);
    var [birthday, setBirthday] = useState<string>("");
    var [message, setMessage] = useState("");

    const handleGet = async () => {
        if (birthday != "") {
            setMessage("Пожалуйста, выберите nationality");
            return
        }
        else console.log("Выводим всех с birthday <", birthday);
        const currFilter: FilterOption = {fieldName: "birthday", operationType: OperationType.LESS, value: birthday};
        var personNumber: number = await PersonService.getCount(currFilter);
        if (!personNumber || personNumber === -1) {
            setMessage(`Ошибка при выводе объектов с birthday < ${birthday} `);
            setBirthday("");
            return
        } else if (personNumber === 0) {
            setMessage(`Пока объектов Person не было создано`);
            setBirthday("");
            return
        }
        if (!tableState) {
            tableState = {pageSize: 10, count:personNumber, currPage:1, filters: [currFilter]};
        }
        setTableState(tableState);
    }

    return (
        <div className={styles.container}>
            <label className={styles.label}>Введите день рождения:</label>
            <input
                type="date"
                className={styles.input}
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
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