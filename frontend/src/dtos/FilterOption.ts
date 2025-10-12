import OperationType from "./OperationType";

interface FilterOption {
    fieldName: string;
    operationType: OperationType;
    value?: string;
}

export default FilterOption;