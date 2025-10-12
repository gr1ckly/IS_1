import DeleteNationality from "./DeleteNationality";
import LessNationality from "./LessNationality";
import EyesColor from "./EyesColor";
import HairColor from "./HairColor";
import LessBirthday from "./LessBirthday";

export default function SpecialOperationsComponent () {
   return (
        <div className="special-operations">
            <DeleteNationality/>
            <LessNationality/>
            <EyesColor/>
            <HairColor/>
            <LessBirthday/>
        </div>
    )
}