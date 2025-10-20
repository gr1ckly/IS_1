import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import TableState from "../../storage/states/TableState";
import FilterOption from "../../dtos/FilterOption";
import OperationType from "../../dtos/OperationType";
import {
    COPY_STATE,
    SET_CREATE_COORDINATES, SET_NOTIFICATIONS,
    SET_UPDATE_COORDINATES,
} from "../../consts/StateConsts";
import CoordinatesDTO from "../../dtos/CoordinatesDTO";
import CoordinatesService from "../../services/CoordinatesService";
import styles from "../../styles/CoordinatesComponent.module.css"
import {selectNotifications} from "../../storage/StateSelectors";

interface SortProps {
    id?: boolean,
    x?: boolean,
    y?: boolean,
}

export default function CoordinatesComponent() {
    const dispatcher = useDispatch();
    const [coordinates, setCoordinates] = useState<CoordinatesDTO[]>([]);
    const notifications = useSelector(selectNotifications) ?? [];

    const [tableState, setTableState] = useState<TableState>({pageSize: 5, currPage: 1, count: 0});
    const [sortState, setSortState] = useState<SortProps>({});
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const currState = useSelector(state => state);

    const applyFilters = () => {
        const newFilters: FilterOption[] =[];
        if (sortState.id !== undefined) {
            newFilters.push({fieldName: "id", operationType: sortState.id ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.x !== undefined) {
            newFilters.push({fieldName: "x", operationType: sortState.x ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        if (sortState.y !== undefined) {
            newFilters.push({fieldName: "y", operationType: sortState.y ? OperationType.SORTED : OperationType.SORTED_DESC});
        }
        setTableState({...tableState, filters: newFilters});
    }

    const updateCoordinates = async () => {
        var currFilters: FilterOption[];
        if (!tableState.filters || tableState.filters.length < 1) {
            currFilters = [];
        } else {
            currFilters = tableState.filters;
        }
        const newCount: number = await CoordinatesService.getCount(...currFilters);
        if (newCount !== tableState.count) {
            if (newCount <= (tableState.currPage - 1) * tableState.pageSize) {
                setTableState({...tableState, currPage: Math.trunc(((newCount - 1) / tableState.pageSize) + 1)});
            }
            setTableState({...tableState, count: newCount});
        }
        const newCoordinates = await CoordinatesService.searchCoordinates(Math.trunc((tableState.currPage - 1) * tableState.pageSize), tableState.pageSize, ...currFilters);
        setCoordinates(newCoordinates);
    }

    useEffect(() => {
        updateCoordinates();
    }, [tableState, currState, updateCoordinates]);

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

    return (
        <div className={styles.ContainerComponent}>
            <div className={styles.header}>
                <button className={styles.createButton} onClick={() => dispatcher({type: SET_CREATE_COORDINATES, payload: true})}>
                    Создать Coordinates
                </button>
                <button className={styles.filterButton} onClick={() => {setIsFilterOpen(!isFilterOpen)}}>
                    Фильтры/Сортировка
                </button>
            </div>
            {isFilterOpen && (
                <div className={styles.filters}>
                    <div className={styles.field}>
                        <span className={styles.label}>id:</span>
                        <select className={styles.select} onChange={(e) => {
                            if (e.target.value === "") {
                                setSortState({...sortState, id: undefined});
                            } else if (e.target.value === "ASC") {
                                setSortState({...sortState, id: true});
                            } else if (e.target.value === "DESC") {
                                setSortState({...sortState, id: false});
                            }
                        }}>
                            <option value="">— выберите —</option>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>x:</span>
                        <select className={styles.select} onChange={(e) => {
                            if (e.target.value === "") {
                                setSortState({...sortState, x: undefined});
                            } else if (e.target.value === "ASC") {
                                setSortState({...sortState, x: true});
                            } else if (e.target.value === "DESC") {
                                setSortState({...sortState, x: false});
                            }
                        }}>
                            <option value="">— выберите —</option>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.label}>y:</span>
                        <select className={styles.select} onChange={(e) => {
                            if (e.target.value === "") {
                                setSortState({...sortState, y: undefined});
                            } else if (e.target.value === "ASC") {
                                setSortState({...sortState, y: true});
                            } else if (e.target.value === "DESC") {
                                setSortState({...sortState, y: false});
                            }
                        }}>
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
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>x</th>
                        <th>y</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {coordinates.map((coord, index) => (
                        <tr key={coord.id ?? index}>
                            <td>{coord.id ?? ""}</td>
                            <td>{coord.x}</td>
                            <td>{coord.y}</td>
                            <td>
                                <button className={styles.deleteButton} onClick={async () => {
                                    if (coord.id) {
                                        const number = await CoordinatesService.deleteCoordinates(coord.id);
                                        if (number === -1) {
                                            dispatcher({type: SET_NOTIFICATIONS, payload: [...notifications, "Ошибка при удалении Coordinates. Попробуйте сначала убрать все зависимости, а потом попробовать снова."]});
                                        } else {
                                            dispatcher({type: COPY_STATE});
                                        }
                                    }
                                }}>
                                    Удалить
                                </button>
                            </td>
                            <td>
                                <button className={styles.updateButton} onClick={() => {
                                    dispatcher({ type: SET_UPDATE_COORDINATES, payload: coord });
                                }}>
                                    Обновить
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
                        <div className={styles.pagination}>
                            {tableState.currPage > 1 && (
                                <button className={styles.pageButton} onClick={handlePrev}>prev</button>
                            )}
                            <span className={styles.pageLabel}>{tableState.currPage}</span>
                            {tableState.currPage * tableState.pageSize < tableState.count && (
                                <button className={styles.pageButton} onClick={handleNext}>next</button>
                            )}
                        </div>
            </div>
        </div>

    )
}