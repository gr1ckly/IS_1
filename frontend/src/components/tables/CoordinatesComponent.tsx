import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import LocationDTO from "../../dtos/LocationDTO";
import TableState from "../../storage/states/TableState";
import FilterOption from "../../dtos/FilterOption";
import OperationType from "../../dtos/OperationType";
import LocationService from "../../services/LocationService";
import {
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
                tableState.currPage = ((newCount - 1) / tableState.pageSize) + 1;
            }
            tableState.count = newCount;
            setTableState(tableState);
        }
        const newCoordinates = await CoordinatesService.searchCoordinates((tableState.currPage - 1) * tableState.pageSize, tableState.pageSize, ...currFilters);
        setCoordinates(newCoordinates);
    }


    return (
        <>
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
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>name</th>
                        <th>x</th>
                        <th>y</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {coordinates.map((coordinates) => (
                        <>
                            <th>{coordinates.id ? coordinates.id : ""}</th>
                            <th>{coordinates.x}</th>
                            <th>{coordinates.y}</th>
                            <th>
                                <button className="delete-button"
                                        onClick={() => {
                                            if (coordinates.id) CoordinatesService.deleteCoordinates(coordinates.id);
                                        }}/>
                            </th>
                            <th>
                                <button className="update-button"
                                        onClick={() => {dispatcher({type: SET_UPDATE_COORDINATES, payload: coordinates})}}
                                />
                            </th>
                        </>
                    ))}
                    </tbody>
                    {tableState.currPage > 1 &&
                        <button
                            onClick={handleNext}
                        >
                            prev
                        </button>
                    }
                    {tableState.pageSize <= tableState.count && <label className="page">{tableState.currPage}</label>}
                    {tableState.currPage * tableState.pageSize < tableState.count  && (
                        <button
                            onClick={handlePrev}
                        >
                            next
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}