import PersonTable from "./PersonTable";
import TableState from "../../storage/states/TableState";
import Color from "../../dtos/ColorEnum";
import Country from "../../dtos/CountryEnum";
import {useState} from "react";
import FilterOption from "../../dtos/FilterOption";
import OperationType from "../../dtos/OperationType";
import {useDispatch} from "react-redux";
import {SET_CREATE_PERSON} from "../../consts/StateConsts";
import styles from "../../styles/PersonComponent.module.css";

interface FilterProps {
    name?: string,
    eyeColor?: Color
    hairColor?: Color,
    nationality?: Country,
}

interface SortProps {
    id?: boolean,
    name?: boolean,
    coordinatesId?: boolean,
    creationDate?: boolean,
    eyeColor?: boolean
    hairColor?: boolean,
    locationId?: boolean,
    height?: boolean,
    birthday?: boolean,
    weight?: boolean,
    nationality?: boolean,
}

export default function PersonComponent() {
    var [tableState, setTableState] = useState<TableState>({pageSize: 10, currPage: 1, count: 0});
    var [filterState, setFilterState] = useState<FilterProps>({});
    var [sortState, setSortState] = useState<SortProps>({});
    var [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const dispatcher = useDispatch();

    const applyFilters = () => {
        var newFilters: FilterOption[] =[];
        if (filterState.name) {
            newFilters.push({fieldName: "name", operationType: OperationType.EQUAL, value: filterState.name});
        }
        if (filterState.eyeColor) {
            newFilters.push({fieldName: "eye_color", operationType: OperationType.EQUAL, value: filterState.eyeColor.valueOf().toString()});
        }
        if (filterState.hairColor) {
            newFilters.push({fieldName: "hair_color", operationType: OperationType.EQUAL, value: filterState.hairColor.valueOf().toString()});
        }
        if (filterState.nationality) {
            newFilters.push({fieldName: "nationality", operationType: OperationType.EQUAL, value: filterState.nationality.valueOf().toString()});
        }
        if (sortState.id != undefined) {
            newFilters.push({fieldName: "id", operationType: sortState.id ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.name != undefined) {
            newFilters.push({fieldName: "name", operationType: sortState.name ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.coordinatesId != undefined) {
            newFilters.push({fieldName: "coordinates_id", operationType: sortState.coordinatesId ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.creationDate != undefined) {
            newFilters.push({fieldName: "creation_date", operationType: sortState.creationDate ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.eyeColor != undefined) {
            newFilters.push({fieldName: "eye_color", operationType: sortState.eyeColor ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.hairColor != undefined) {
            newFilters.push({fieldName: "hair_color", operationType: sortState.hairColor ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.locationId != undefined) {
            newFilters.push({fieldName: "location_id", operationType: sortState.locationId ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.height != undefined) {
            newFilters.push({fieldName: "height", operationType: sortState.height ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.weight != undefined) {
            newFilters.push({fieldName: "weight", operationType: sortState.weight ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.nationality != undefined) {
            newFilters.push({fieldName: "nationality", operationType: sortState.nationality ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        setTableState({...tableState, filters: newFilters});
    }

    return (
        <div className={styles.personComponent}>
            <button
                className={styles.button}
                onClick={() => dispatcher({ type: SET_CREATE_PERSON, payload: true })}
            >
                Создать Person
            </button>
            <button
                className={styles.button}
                onClick={() => {
                    setIsFilterOpen(!isFilterOpen);
                }}
            >
                Фильтры/Сортировка
            </button>
            {isFilterOpen && (
                <div className={styles.filterPanel}>
                    <div className={styles.field}>
                        <label className={styles.label}>{"id"}</label>
                        <select
                            className={styles.select}
                            id="sort"
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setSortState({ ...sortState, id: undefined });
                                } else if (e.target.value === "ASC") {
                                    setSortState({ ...sortState, id: true });
                                } else if (e.target.value === "DESC") {
                                    setSortState({ ...sortState, id: false });
                                }
                            }}
                        >
                            <option value="">— выберите —</option>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>{"name"}</label>
                        <input
                            className={styles.input}
                            type="text"
                            onChange={(e) => {
                                setFilterState({
                                    ...filterState,
                                    name: e.target.value == "" ? undefined : e.target.value,
                                });
                            }}
                        />
                        <select
                            className={styles.select}
                            id="sort"
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setSortState({ ...sortState, name: undefined });
                                } else if (e.target.value === "ASC") {
                                    setSortState({ ...sortState, name: true });
                                } else if (e.target.value === "DESC") {
                                    setSortState({ ...sortState, name: false });
                                }
                            }}
                        >
                            <option value="">— выберите —</option>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>{"coordinates_id"}</label>
                        <select
                            className={styles.select}
                            id="sort"
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setSortState({ ...sortState, coordinatesId: undefined });
                                } else if (e.target.value === "ASC") {
                                    setSortState({ ...sortState, coordinatesId: true });
                                } else if (e.target.value === "DESC") {
                                    setSortState({ ...sortState, coordinatesId: false });
                                }
                            }}
                        >
                            <option value="">— выберите —</option>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>{"creation_date"}</label>
                        <select
                            className={styles.select}
                            id="sort"
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setSortState({ ...sortState, creationDate: undefined });
                                } else if (e.target.value === "ASC") {
                                    setSortState({ ...sortState, creationDate: true });
                                } else if (e.target.value === "DESC") {
                                    setSortState({ ...sortState, creationDate: false });
                                }
                            }}
                        >
                            <option value="">— выберите —</option>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>
                    </div>

                    <button className={styles.applyButton} onClick={applyFilters}>
                        Применить
                    </button>
                </div>
            )}
            <PersonTable
                tableState={tableState}
                onChangeTableState={(state: TableState) => setTableState(state)}
            />
        </div>

    )
}