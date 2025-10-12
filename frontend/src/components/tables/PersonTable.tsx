import TableState from "../../storage/states/TableState";
import PersonDTO from "../../dtos/PersonDTO";
import {useEffect, useState} from "react";
import PersonService from "../../services/PersonService";
import FilterOption from "../../dtos/FilterOption";
import OperationType from "../../dtos/OperationType";
import {useDispatch} from "react-redux";
import {SET_UPDATE_PERSON} from "../../consts/StateConsts";
import styles from "../../styles/PersonTable.module.css";

interface Props{
    tableState: TableState,
    onChangeTableState: (ts: TableState) => void,
}

export default function PersonTable(props: Props) {
    const dispatcher = useDispatch();
    const [persons, setPersons] = useState<PersonDTO[]>([]);

    useEffect(() => {
        updatePersons();
    }, [props.tableState]);

    const handleNext = async () => {
        if (props.tableState) {
            props.tableState.currPage += 1;
            props.onChangeTableState(props.tableState);
        }
    }

    const handlePrev = async () => {
        if (props.tableState && props.tableState.currPage > 1) {
            props.tableState.currPage -= 1;
            props.onChangeTableState(props.tableState);
        }
    }

    const updatePersons = async () => {
        var currFilters: FilterOption[];
        if (!props.tableState.filters || props.tableState.filters.length < 1) {
            currFilters = [];
        } else {
            currFilters = props.tableState.filters;
        }
        const newCount: number = await PersonService.getCount(...currFilters);
        if (newCount !== props.tableState.count) {
            if (newCount <= (props.tableState.currPage - 1) * props.tableState.pageSize) {
                props.tableState.currPage = ((newCount - 1) / props.tableState.pageSize) + 1;
            }
            props.tableState.count = newCount;
            props.onChangeTableState(props.tableState);
        }
        const newPersons = await PersonService.searchPersons((props.tableState.currPage - 1) * props.tableState.pageSize, props.tableState.pageSize, ...currFilters);
        setPersons(newPersons);
    }


    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
            <tr className={styles.tr}>
                <th className={styles.th}>Id</th>
                <th className={styles.th}>name</th>
                <th className={styles.th}>coordinates_id</th>
                <th className={styles.th}>creation_date</th>
                <th className={styles.th}>eye_color</th>
                <th className={styles.th}>hair_color</th>
                <th className={styles.th}>location_id</th>
                <th className={styles.th}>height</th>
                <th className={styles.th}>birthday</th>
                <th className={styles.th}>weight</th>
                <th className={styles.th}>nationality</th>
                <th className={styles.th}></th>
                <th className={styles.th}></th>
            </tr>
            </thead>
            <tbody className={styles.tbody}>
            {persons.map((person) => (
                <tr className={styles.tr}>
                    <th className={styles.th}>{person.id ?? ""}</th>
                    <th className={styles.th}>{person.name}</th>
                    <th className={styles.th}>{person.coordinatesId}</th>
                    <th className={styles.th}>{person.creationDate ? person.creationDate.toISOString().split("T")[0] : ""}</th>
                    <th className={styles.th}>{person.eyeColor?.toString() ?? ""}</th>
                    <th className={styles.th}>{person.hairColor}</th>
                    <th className={styles.th}>{person.locationId ?? ""}</th>
                    <th className={styles.th}>{person.height}</th>
                    <th className={styles.th}>{person.birthday.toISOString().split("T")[0]}</th>
                    <th className={styles.th}>{person.weight}</th>
                    <th className={styles.th}>{person.nationality.toString()}</th>
                    <th className={styles.th}>
                        <button
                            className={styles.deleteButton}
                            onClick={() => {
                                PersonService.deletePerson({
                                    fieldName: "id",
                                    operationType: OperationType.EQUAL,
                                    value: person.id?.toString(),
                                });
                            }}
                        />
                    </th>
                    <th className={styles.th}>
                        <button
                            className={styles.updateButton}
                            onClick={() => dispatcher({ type: SET_UPDATE_PERSON, payload: person })}
                        />
                    </th>
                </tr>
            ))}
            </tbody>
            {props.tableState.currPage > 1 && (
                <button className={styles.pageButton} onClick={handleNext}>prev</button>
            )}
            {props.tableState.pageSize <= props.tableState.count && (
                <label className={styles.pageLabel}>{props.tableState.currPage}</label>
            )}
            {props.tableState.currPage * props.tableState.pageSize < props.tableState.count && (
                <button className={styles.pageButton} onClick={handlePrev}>next</button>
            )}
        </table>
    )
}