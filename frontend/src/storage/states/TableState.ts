import FilterOption from "../../dtos/FilterOption";

interface TableState {
    pageSize: number;
    currPage: number;
    count: number;
    filters?: FilterOption[];
}

export default TableState;