import PersonDTO from "../../dtos/PersonDTO";
import {useDispatch} from "react-redux";
import {CLEAR_ALL} from "../../consts/StateConsts";
import {ChangeEvent, useState} from "react";
import LocationDTO from "../../dtos/LocationDTO";
import LocationService from "../../services/LocationService";
import Color from "../../dtos/ColorEnum";
import Country from "../../dtos/CountryEnum";
import CoordinatesDTO from "../../dtos/CoordinatesDTO";
import CoordinatesService from "../../services/CoordinatesService";
import PersonService from "../../services/PersonService";
import styles from "../../styles/PersonForm.module.css"

interface Props {
    person?: PersonDTO;
}

export default function PersonForm(props: Props) {
    const dispatcher = useDispatch();
    const [currPerson, setCurrPerson] = useState<PersonDTO>(
        props.person ??
        {
            name: "",
            coordinatesId: 0,
            hairColor: Color.BROWN,
            height: 0,
            birthday: new Date(),
            nationality: Country.RUSSIA
    });
    const [name, setName] = useState(props.person?.name === undefined ? "" : props.person.name);
    const [nameMessage, setNameMessage] = useState<string>("");
    const [locationIdMessage, setLocationIdMessage] = useState<string>("");
    const [coordinatesIdMessage, setCoordinatesIdMessage] = useState<string>("");
    const [eyeColorMessage, setEyeColorMessage] = useState<string>("");
    const [heightMessage, setHeightMessage] = useState<string>("");
    const [weightMessage, setWeightMessage] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleChangeCoordinatesId = async (e: ChangeEvent<HTMLInputElement>) => {
        const currCoordinatesId: number = Number.parseInt(e.target.value);
        const currCoordinates: { coords: CoordinatesDTO | undefined; count: number } = await CoordinatesService.getCoordinatesByID(currCoordinatesId);
        if (currCoordinates.count < 1) {
            setCoordinatesIdMessage(`Coordinates с id = ${currCoordinatesId} не существует`)
            setCurrPerson({...currPerson, coordinatesId: -1});
            return
        }
        setCurrPerson({...currPerson, coordinatesId: currCoordinatesId});
        setCoordinatesIdMessage("");
    }

    const handleChangeLocationId = async (e: ChangeEvent<HTMLInputElement>) => {
        const currLocationId: number = Number.parseInt(e.target.value);
        const currLocation: { coords: LocationDTO | undefined; count: number } = await LocationService.getLocationByID(currLocationId);
        if (currLocation.count < 1) {
            setLocationIdMessage(`Location с id = ${currLocationId} не существует`)
            setCurrPerson({...currPerson, locationId: undefined});
            return
        }
        setCurrPerson({...currPerson, locationId: currLocationId});
        setLocationIdMessage("");
    }

    const handleCreate = async () => {
        if (currPerson.name === "" && currPerson.coordinatesId <= 0 && currPerson.height <= 0) {
            setMessage("Сначала введите корректные значения для всех полей");
        }
        const number = await PersonService.createPerson(currPerson);
        if (number < 1) {
            setMessage("Ошибка при создании Person");
            return
        }
        setMessage(`Создан Person с id = ${number}`)
    }

    const handleUpdate = async () => {
        if (currPerson.name === "" && currPerson.coordinatesId <= 0 && currPerson.height <= 0) {
            setMessage("Сначала введите корректные значения для всех полей");
        }
        const number = await PersonService.updatePerson(currPerson.id ? currPerson.id : 0, currPerson);
        if (number < 1) {
            setMessage(`Ошибка при обновлении Person с id = ${currPerson.id}`);
            return
        }
        setMessage(`Обновлен Person с id = ${number}`)
    }

    return (
        <div className={styles.container}>
            <button
                className={styles.closeButton}
                onClick={() => dispatcher({ type: CLEAR_ALL })}
            >
                Закрыть
            </button>

            {currPerson.id && (
                <label className={styles.idLabel}>
                    Изменение объекта с id: {currPerson.id}
                </label>
            )}

            <div className={styles.field}>
                <label className={styles.label}>name:</label>
                <input
                    type="text"
                    className={styles.input}
                    value={name}
                    onChange={(e) => {
                        if (e.target.value === "") {
                            setNameMessage("Поле name не должно быть пустым");
                        } else {
                            setName(e.target.value);
                            setNameMessage("");
                        }
                    }}
                />
                {nameMessage && (
                    <label className={styles.message}>{nameMessage}</label>
                )}
            </div>

            <div className={styles.field}>
                <label className={styles.label}>coordinates_id:</label>
                <input
                    type="number"
                    step="1"
                    className={styles.input}
                    value={currPerson.coordinatesId}
                    onChange={handleChangeCoordinatesId}
                />
                {coordinatesIdMessage && (
                    <label className={styles.message}>{coordinatesIdMessage}</label>
                )}
            </div>

            <div className={styles.field}>
                <label className={styles.label}>eyeColor (необязательно):</label>
                <select
                    id="eyeColor"
                    className={styles.select}
                    value={currPerson.eyeColor ?? ""}
                    onChange={(e) => {
                        setCurrPerson({
                            ...currPerson,
                            eyeColor: e.target.value as unknown as Color,
                        });
                        if (e.target.value !== "") setEyeColorMessage("");
                    }}
                >
                    <option value=""></option>
                    {Object.values(Color).map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
                {eyeColorMessage && (
                    <label className={styles.message}>{eyeColorMessage}</label>
                )}
            </div>

            <div className={styles.field}>
                <label className={styles.label}>hairColor:</label>
                <select
                    id="hairColor"
                    className={styles.select}
                    value={currPerson.hairColor}
                    onChange={(e) =>
                        setCurrPerson({
                            ...currPerson,
                            hairColor: e.target.value as unknown as Color,
                        })
                    }
                >
                    {Object.values(Color).map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>location_id (необязательно):</label>
                <input
                    type="number"
                    step="1"
                    className={styles.input}
                    value={currPerson.locationId ?? ""}
                    onChange={handleChangeLocationId}
                />
                {locationIdMessage && (
                    <label className={styles.message}>{locationIdMessage}</label>
                )}
            </div>

            <div className={styles.field}>
                <label className={styles.label}>height:</label>
                <input
                    type="number"
                    step="any"
                    className={styles.input}
                    value={currPerson.height}
                    onChange={(e) => {
                        const currHeight = Number.parseFloat(e.target.value);
                        if (currHeight <= 0) {
                            setCurrPerson({ ...currPerson, height: 0 });
                            setHeightMessage("Поле height должно быть больше 0");
                        } else {
                            setCurrPerson({
                                ...currPerson,
                                height: currHeight,
                            });
                            setHeightMessage("");
                        }
                    }}
                />
                {heightMessage && (
                    <label className={styles.message}>{heightMessage}</label>
                )}
            </div>

            <div className={styles.field}>
                <label className={styles.label}>birthday:</label>
                <input
                    type="date"
                    className={styles.input}
                    value={currPerson.birthday
                        ? currPerson.birthday.toISOString().split("T")[0]
                        : ""}
                    onChange={(e) => {
                        const currBirthday = new Date(e.target.value);
                        setCurrPerson({
                            ...currPerson,
                            birthday: currBirthday,
                        });
                    }}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>weight (необязательно):</label>
                <input
                    type="number"
                    step="any"
                    className={styles.input}
                    value={currPerson.weight ?? ""}
                    onChange={(e) => {
                        const currWeight = Number.parseFloat(e.target.value);
                        if (currWeight <= 0) {
                            setCurrPerson({ ...currPerson, weight: 0 });
                            setWeightMessage("Поле weight должно быть больше 0");
                        } else {
                            setCurrPerson({
                                ...currPerson,
                                weight: currWeight,
                            });
                            setWeightMessage("");
                        }
                    }}
                />
                {weightMessage && (
                    <label className={styles.message}>{weightMessage}</label>
                )}
            </div>

            <div className={styles.field}>
                <label className={styles.label}>nationality:</label>
                <select
                    id="nationality"
                    className={styles.select}
                    value={currPerson.nationality}
                    onChange={(e) =>
                        setCurrPerson({
                            ...currPerson,
                            nationality: e.target.value as unknown as Country,
                        })
                    }
                >
                    {Object.values(Country).map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
            </div>

            {currPerson.id ? (
                <button className={styles.actionButton} onClick={handleUpdate}>
                    Обновить
                </button>
            ) : (
                <button className={styles.actionButton} onClick={handleCreate}>
                    Создать Person
                </button>
            )}

            {message && <label className={styles.message}>{message}</label>}
        </div>
    )
}