import DeleteNationality from "./DeleteNationality";
import LessNationality from "./LessNationality";
import EyesColor from "./EyesColor";
import HairColor from "./HairColor";
import LessBirthday from "./LessBirthday";

export default function SpecialOperationsComponent () {
   return (
       <div className="special-operations" style={{
           display: "grid",
           gridTemplateColumns: "1fr 1fr",
           gap: "16px",
           justifyItems: "center",
           alignItems: "start",
           position: "relative"
       }}>
           <DeleteNationality />
           <LessNationality />
           <EyesColor />
           <HairColor />
           <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center" }}>
               <LessBirthday />
           </div>
       </div>
    )
}