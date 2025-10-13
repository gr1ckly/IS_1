import {useDispatch} from "react-redux";
import {CLEAR_ALL} from "../../consts/StateConsts";
import LocationDTO from "../../dtos/LocationDTO";
import {useState} from "react";
import LocationService from "../../services/LocationService";
import styles from "../../styles/LocationForm.module.css"

interface Props {
    location?: LocationDTO;
}

export default function LocationForm(props: Props) {
    const dispatcher = useDispatch();
    const [newLocation, setLocation] = useState(
        props.location ??
        {
            x: 0,
            y: 0,
            name: "",
        }
    )
    const [nameMessage, setNameMessage] = useState("");
    const [message, setMessage] = useState("");

    const handleCreate = async () => {
        if (newLocation.name.length > 871) {
            setMessage("Некорректное значение поля name");
            return
        }
        const number = await LocationService.createLocation(newLocation);
        if (number < 1) {
            setMessage("Ошибка при создании Location");
            return
        }
        setMessage(`Создан Location с id = ${number}`)
    }

    const handleUpdate = async () => {
        if (newLocation.name.length > 871) {
            setMessage("Некорректное значение поля name");
            return
        }
        const number = await LocationService.updateLocation(newLocation.id ? newLocation.id : 0, newLocation);
        if (number < 1) {
            setMessage(`Ошибка при обновлении Location с id = ${newLocation.id}`);
            return
        }
        setMessage(`Обновлен Location с id = ${number}`)
    }

    return (
        <div className={styles.container}>
            <label className={styles.label}>Location</label>
            <button
                className={styles.closeButton}
                onClick={() => dispatcher({ type: CLEAR_ALL })}
            >
                Закрыть
            </button>

            {newLocation.id && (
                <label className={styles.idLabel}>
                    Изменение Location с id: {newLocation.id}
                </label>
            )}

            <div className={styles.field}>
                <label className={styles.label}>X:</label>
                <input
                    className={styles.input}
                    type="number"
                    step="any"
                    value={newLocation.x}
                    onChange={(e) =>
                        setLocation({
                            ...newLocation,
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
                    step="any"
                    value={newLocation.y}
                    onChange={(e) =>
                        setLocation({
                            ...newLocation,
                            y: Number.parseFloat(e.target.value),
                        })
                    }
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Name:</label>
                <input
                    className={styles.input}
                    type="text"
                    value={newLocation.name}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 871) {
                            setLocation({ ...newLocation, name: value });
                            setNameMessage("");
                        } else {
                            setNameMessage(
                                "Длина поля name не должна превышать 871 символ"
                            );
                        }
                    }}
                />
                {nameMessage && (
                    <label className={styles.message}>{nameMessage}</label>
                )}
            </div>

            {newLocation.id ? (
                <button className={styles.actionButton} onClick={handleUpdate}>
                    Обновить
                </button>
            ) : (
                <button className={styles.actionButton} onClick={handleCreate}>
                    Создать
                </button>
            )}

            {message && <label className={styles.message}>{message}</label>}
        </div>
    )
}