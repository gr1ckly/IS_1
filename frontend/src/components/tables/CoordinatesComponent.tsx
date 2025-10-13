import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import LocationDTO from "../../dtos/LocationDTO";
import TableState from "../../storage/states/TableState";
import FilterOption from "../../dtos/FilterOption";
import OperationType from "../../dtos/OperationType";
import LocationService from "../../services/LocationService";
import {
    COPY_STATE,
    SET_CREATE_COORDINATES,
    SET_CREATE_LOCATION,
    SET_CREATE_PERSON, SET_UPDATE_COORDINATES,
    SET_UPDATE_LOCATION
} from "../../consts/StateConsts";
import CoordinatesDTO from "../../dtos/CoordinatesDTO";
import CoordinatesService from "../../services/CoordinatesService";
import coordinatesService from "../../services/CoordinatesService";

interface SortProps {
    id?: boolean,
    x?: boolean,
    y?: boolean,
}

export default function CoordinatesComponent() {
    const dispatcher = useDispatch();
    const [coordinates, setCoordinates] = useState<CoordinatesDTO[]>([]);

    var [tableState, setTableState] = useState<TableState>({pageSize: 5, currPage: 1, count: 0});
    var [sortState, setSortState] = useState<SortProps>({});
    var [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const currState = useSelector(state => state);

    const applyFilters = () => {
        var newFilters: FilterOption[] =[];
        if (sortState.id != undefined) {
            newFilters.push({fieldName: "id", operationType: sortState.id ? OperationType.SORTED : OperationType.SORTED_DESC});
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
        updateCoordinates();
    }, [tableState, currState]);

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

    const updateCoordinates = async () => {
        var currFilters: FilterOption[];
        if (!tableState.filters || tableState.filters.length < 1) {
            currFilters = [];
        } else {
            currFilters = tableState.filters;
        }
        const newCount: number = await CoordinatesService.getCount(...currFilters);
        if (newCount != tableState.count) {
            if (newCount <= (tableState.currPage - 1) * tableState.pageSize) {
                tableState.currPage = Math.trunc(((newCount - 1) / tableState.pageSize) + 1);
            }
            tableState.count = newCount;
            setTableState(tableState);
        }
        const newCoordinates = await CoordinatesService.searchCoordinates(Math.trunc((tableState.currPage - 1) * tableState.pageSize), tableState.pageSize, ...currFilters);
        setCoordinates(newCoordinates);
    }


    return (
            <div className="CoordinatesComponent">
                <button  onClick={() => dispatcher({type: SET_CREATE_COORDINATES, payload: true})}>
                    Создать Coordinates
                </button>
                <button onClick={() => {setIsFilterOpen(!isFilterOpen)}}>
                    Фильтры/Сортировка
                </button>
                {isFilterOpen && (
                    <>
                        <div className="field">
                            <label className="label">id:</label>
                            <select
                                id="sort"
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                        setSortState({...sortState, id: undefined});
                                    } else if (e.target.value === "ASC") {
                                        setSortState({...sortState, id: true});
                                    } else if (e.target.value === "DESC") {
                                        setSortState({...sortState, id: false});
                                    }
                                }}
                            >
                                <option value="">— выберите —</option>
                                <option value="ASC">ASC</option>
                                <option value="DESC">DESC</option>
                            </select>
                        </div>
                        <div className="field">
                            <label className="label">x:</label>
                            <select
                                id="sort"
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                        setSortState({...sortState, x: undefined});
                                    } else if (e.target.value === "ASC") {
                                        setSortState({...sortState, x: true});
                                    } else if (e.target.value === "DESC") {
                                        setSortState({...sortState, x: false});
                                    }
                                }}
                            >
                                <option value="">— выберите —</option>
                                <option value="ASC">ASC</option>
                                <option value="DESC">DESC</option>
                            </select>
                        </div>
                        <div className="field">
                            <label className="label">y:</label>
                            <select
                                id="sort"
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                        setSortState({...sortState, y: undefined});
                                    } else if (e.target.value === "ASC") {
                                        setSortState({...sortState, y: true});
                                    } else if (e.target.value === "DESC") {
                                        setSortState({...sortState, y: false});
                                    }
                                }}
                            >
                                <option value="">— выберите —</option>
                                <option value="ASC">ASC</option>
                                <option value="DESC">DESC</option>
                            </select>
                        </div>
                        <button
                            onClick={applyFilters}>
                            Применить
                        </button>
                    </>
                )}
                <div className="table">
                    <table className="coordinates-table">
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
                                    <button
                                        className="delete-button"
                                        onClick={() => {
                                            if (coord.id) {
                                                CoordinatesService.deleteCoordinates(coord.id);
                                                dispatcher({type: COPY_STATE})
                                            }
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="update-button"
                                        onClick={() => {
                                            dispatcher({ type: SET_UPDATE_COORDINATES, payload: coord });
                                        }}
                                    >
                                        Обновить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan={5} className="pagination">
                                {tableState.currPage > 1 && (
                                    <button onClick={handlePrev}>prev</button>
                                )}
                                <span className="page">{tableState.currPage}</span>
                                {tableState.currPage * tableState.pageSize < tableState.count && (
                                    <button onClick={handleNext}>next</button>
                                )}
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>

            </div>
    )
}