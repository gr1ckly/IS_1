import React, {useEffect} from 'react';
import '../App.css';
import SpecialOperationsComponent from "./specialOperations/SpecialOperations";
import PersonComponent from "./tables/PersonComponent";
import LocationComponent from "./tables/LocationComponent";
import CoordinatesComponent from "./tables/CoordinatesComponent";
import Popup from "./modal/Popup";
import {useDispatch} from "react-redux";
import {COPY_STATE} from "../consts/StateConsts";
import {BASE_URL, SSE_PATH} from "../consts/HttpConsts";
import styles from "../styles/App.module.css";
import Notification from "./modal/Notification";

function App() {
    const dispatcher = useDispatch();

    useEffect(() => {
        const eventSource = new EventSource(BASE_URL + SSE_PATH);

        eventSource.onopen = () => console.log("SSE подключено");

        eventSource.addEventListener("update", (e) => {
            console.log("Новое событие SSE:", e.data);
            dispatcher({ type: COPY_STATE });
        });

        eventSource.addEventListener("ping", () => {
            console.log("пинг SSE");
        });

        eventSource.onerror = (err) => {
            console.error("Ошибка SSE:", err);
        };

        return () => {
            console.log("SSE закрыто");
            eventSource.close();
        };
    }, [dispatcher]);

    return (
        <div className={styles.App}>
            <Notification/>
            <Popup/>
            <div className={styles.layout}>
                <div className={styles.person}>
                    <PersonComponent />
                </div>
                <div className={styles.middleRow}>
                    <div className={styles.left}>
                        <LocationComponent />
                    </div>
                    <div className={styles.right}>
                        <CoordinatesComponent />
                    </div>
                </div>
                <div className={styles.special}>
                    <SpecialOperationsComponent />
                </div>
            </div>
        </div>
    )
}

export default App;
