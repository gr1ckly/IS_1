import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import FilterOption from "../../dtos/FilterOption";
import OperationType from "../../dtos/OperationType";
import {SET_CREATE_LOCATION, SET_UPDATE_LOCATION} from "../../consts/StateConsts";
import LocationDTO from "../../dtos/LocationDTO";
import TableState from "../../storage/states/TableState";
import LocationService from "../../services/LocationService";
import styles from "../../styles/LocationComponent.module.css";


interface FilterProps {
    name?: string,
}

interface SortProps {
    id?: boolean,
    name?: boolean,
    x?: boolean,
    y?: boolean,
}

export default function LocationComponent () {
    const dispatcher = useDispatch();
    const [locations, setLocations] = useState<LocationDTO[]>([]);

    var [tableState, setTableState] = useState<TableState>({pageSize: 5, currPage: 1, count: 0});
    var [filterState, setFilterState] = useState<FilterProps>({});
    var [sortState, setSortState] = useState<SortProps>({});
    var [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    const applyFilters = () => {
        var newFilters: FilterOption[] =[];
        if (filterState.name) {
            newFilters.push({fieldName: "name", operationType: OperationType.EQUAL, value: filterState.name});
        }
        if (sortState.id != undefined) {
            newFilters.push({fieldName: "id", operationType: sortState.id ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.name != undefined) {
            newFilters.push({fieldName: "name", operationType: sortState.name ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.x != undefined) {
            newFilters.push({fieldName: "x", operationType: sortState.x ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.y != undefined) {
            newFilters.push({fieldName: "y", operationType: sortState.y ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        setTableState({...tableState, filters: newFilters});
    }

    useEffect(() => {
        updateLocations();
    }, [tableState]);

    const handleNext = async () => {
        if (tableState) {
            setTableState({...tableState, currPage: tableState.currPage + 1});
        }
    }

    const handlePrev = async () => {
        if (tableState && tableState.currPage > 1) {
            setTableState({...tableState, currPage: tableState.currPage - 1});
        }
    }

    const updateLocations = async () => {
        var currFilters: FilterOption[];
        if (!tableState.filters || tableState.filters.length < 1) {
            currFilters = [];
        } else {
            currFilters = tableState.filters;
        }
        const newCount: number = await LocationService.getCount(...currFilters);
        if (newCount != tableState.count) {
            if (newCount <= (tableState.currPage - 1) * tableState.pageSize) {
                tableState.currPage = ((newCount - 1) / tableState.pageSize) + 1;
            }
            tableState.count = newCount;
            setTableState(tableState);
        }
        const newLocations = await LocationService.searchLocations((tableState.currPage - 1) * tableState.pageSize, tableState.pageSize, ...currFilters);
        setLocations(newLocations);
    }


    return (
        <>
            <div className={styles.LocationComponent}>
                <button
                    className={styles.button}
                    onClick={() => dispatcher({ type: SET_CREATE_LOCATION, payload: true })}
                >
                    Создать Location
                </button>

                <button
                    className={styles.button}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    Фильтры/Сортировка
                </button>

                {isFilterOpen && (
                    <div className={styles.filters}>
                        {/* Поле id */}
                        <div className={styles.field}>
                            <label className={styles.label}>id</label>
                            <select
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSortState({
                                        ...sortState,
                                        id: val === "" ? undefined : val === "ASC",
                                    });
                                }}
                            >
                                <option value="">— выберите —</option>
                                <option value="ASC">ASC</option>
                                <option value="DESC">DESC</option>
                            </select>
                        </div>

                        {/* Поле name */}
                        <div className={styles.field}>
                            <label className={styles.label}>name</label>
                            <input
                                className={styles.input}
                                type="text"
                                onChange={(e) =>
                                    setFilterState({
                                        ...filterState,
                                        name: e.target.value === "" ? undefined : e.target.value,
                                    })
                                }
                            />
                            <select
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSortState({
                                        ...sortState,
                                        name: val === "" ? undefined : val === "ASC",
                                    });
                                }}
                            >
                                <option value="">— выберите —</option>
                                <option value="ASC">ASC</option>
                                <option value="DESC">DESC</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>x:</label>
                            <select
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSortState({
                                        ...sortState,
                                        x: val === "" ? undefined : val === "ASC",
                                    });
                                }}
                            >
                                <option value="">— выберите —</option>
                                <option value="ASC">ASC</option>
                                <option value="DESC">DESC</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>y:</label>
                            <select
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSortState({
                                        ...sortState,
                                        y: val === "" ? undefined : val === "ASC",
                                    });
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

                <div className={styles.table}>
                    <table>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>X</th>
                            <th>Y</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {locations.map((location) => (
                            <tr key={location.id}>
                                <td>{location.id ?? ""}</td>
                                <td>{location.name}</td>
                                <td>{location.x}</td>
                                <td>{location.y}</td>
                                <td>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => {
                                            if (location.id)
                                                LocationService.deleteLocation(location.id);
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={styles.updateButton}
                                        onClick={() =>
                                            dispatcher({
                                                type: SET_UPDATE_LOCATION,
                                                payload: location,
                                            })
                                        }
                                    >
                                        Изменить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className={styles.pagination}>
                        {tableState.currPage > 1 && (
                            <button onClick={handleNext}>prev</button>
                        )}
                        {tableState.pageSize <= tableState.count && (
                            <label className={styles.page}>{tableState.currPage}</label>
                        )}
                        {tableState.currPage * tableState.pageSize < tableState.count && (
                            <button onClick={handlePrev}>next</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}