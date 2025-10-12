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

function App() {
    const dispatcher = useDispatch();

    useEffect(() => {
        const eventSource = new EventSource(BASE_URL + SSE_PATH);

        eventSource.onopen = () => {
            console.log("Подключено к SSE");
        };

        eventSource.onmessage = (event) => {
            console.log("Новое событие:", event.data);
            dispatcher({type: COPY_STATE});
        };

        eventSource.onerror = (error) => {
            console.error("Ошибка SSE:", error);
            eventSource.close();
        };

        return () => {
            console.log("Закрываем соединение");
            eventSource.close();
        };
    }, []);

    return (
        <div className={styles.App}>
            <Popup/>
            <PersonComponent/>
            <LocationComponent/>
            <CoordinatesComponent/>
            <SpecialOperationsComponent/>
        </div>
    )
}

export default App;
