import {useSelector} from "react-redux";
import {
    selectCreateCoordinates, selectCreateLocation,
    selectCreatePerson,
    selectUpdatedCoordinates,
    selectUpdatedLocation,
    selectUpdatedPerson
} from "../../storage/StateSelectors";
import PersonForm from "./PersonForm";
import CoordinatesForm from "./CoordinatesForm";
import LocationForm from "./LocationForm";
import styles from "../../styles/Popup.module.css"

export default function Popup() {
    const updatedPerson = useSelector(selectUpdatedPerson);
    const updatedCoordinates = useSelector(selectUpdatedCoordinates);
    const updatedLocation = useSelector(selectUpdatedLocation);
    const createPerson = useSelector(selectCreatePerson);
    const createCoordinates = useSelector(selectCreateCoordinates);
    const createLocation = useSelector(selectCreateLocation);

    return (
        <>
            {(updatedPerson || updatedCoordinates || updatedLocation || createPerson || createCoordinates || createLocation) && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>
                        {updatedPerson && <PersonForm person={updatedPerson} />}
                        {updatedCoordinates && <CoordinatesForm coordinates={updatedCoordinates} />}
                        {updatedLocation && <LocationForm location={updatedLocation} />}
                        {createPerson && <PersonForm />}
                        {createCoordinates && <CoordinatesForm />}
                        {createLocation && <LocationForm />}
                    </div>
                </div>
            )}
        </>
    )
}