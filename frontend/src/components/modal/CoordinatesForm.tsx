import {useDispatch} from "react-redux";
import {CLEAR_ALL} from "../../consts/StateConsts";
import CoordinatesDTO from "../../dtos/CoordinatesDTO";
import {useState} from "react";
import CoordinatesService from "../../services/CoordinatesService";
import styles from "../../styles/CoordinatesForm.module.css"

interface Props {
    coordinates?: CoordinatesDTO;
}

export default function CoordinatesForm(props: Props) {
    const dispatcher = useDispatch();
    const [newCoordinates, setCoordinates] = useState(
        props.coordinates ??
        {
            x: 0,
            y: 0,
        }
    )
    const [message, setMessage] = useState("");

    const handleCreate = async () => {
        if (newCoordinates.x <= -459) {
            setMessage("Некорректное значение поля x");
            return
        }
        if (newCoordinates.y <= -238) {
            setMessage("Некорректное значение поля y");
            return
        }
        const number = await CoordinatesService.createCoordinates(newCoordinates);
        if (number < 1) {
            setMessage("Ошибка при создании Coordinates");
            return
        }
        setMessage(`Создан Coordinates с id = ${number}`)
    }

    const handleUpdate = async () => {
        if (newCoordinates.x <= -459) {
            setMessage("Некорректное значение поля x");
            return
        }
        if (newCoordinates.y <= -238) {
            setMessage("Некорректное значение поля y");
            return
        }
        const number = await CoordinatesService.updateCoordinates(newCoordinates.id ? newCoordinates.id : 0, newCoordinates);
        if (number < 1) {
            setMessage(`Ошибка при обновлении Coordinates с id = ${newCoordinates.id}`);
            return
        }
        setMessage(`Обновлен Coordinates с id = ${number}`)
    }

    return (
        <div className={styles.container}>
            <label className={styles.label}>Coordinates</label>
            <button
                className={styles.closeButton}
                onClick={() => dispatcher({ type: CLEAR_ALL })}
            >
                Закрыть
            </button>

            {newCoordinates.id && (
                <label className={styles.idLabel}>
                    Изменение Location с id: {newCoordinates.id}
                </label>
            )}

            <div className={styles.field}>
                <label className={styles.label}>X:</label>
                <input
                    className={styles.input}
                    type="number"
                    step="any"
                    value={newCoordinates.x}
                    onChange={(e) =>
                        setCoordinates({
                            ...newCoordinates,
                            x: Number.parseFloat(e.target.value),
                        })
                    }
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Y:</label>
                <input
                    className={styles.input}
                    type="number"
                    step="1"
                    value={newCoordinates.y}
                    onChange={(e) =>
                        setCoordinates({
                            ...newCoordinates,
                            y: Number.parseInt(e.target.value),
                        })
                    }
                />
            </div>

            {newCoordinates.id && (
                <button className={styles.actionButton} onClick={handleUpdate}>
                    Обновить
                </button>
            )}
            {newCoordinates.id === undefined && (
                <button className={styles.actionButton} onClick={handleCreate}>
                    Создать
                </button>
            )}

            {message !== "" && (
                <label className={styles.message}>{message}</label>
            )}
        </div>
    )
}