import FilterOption from "../dtos/FilterOption";
import {BASE_URL, LOCATION_PATH, PERSON_PATH} from "../consts/HttpConsts";
import LocationDTO from "../dtos/LocationDTO";
import PersonDTO from "../dtos/PersonDTO";

class PersonService {
    public static async getCount(...options: FilterOption[]) : Promise<number> {
        const finalUrl: string = BASE_URL + PERSON_PATH + "/get_count";
        const response: Response = await fetch(finalUrl, {
            method: "POST",
            headers: {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(options)
        });
        if (!response.ok) {
            console.error("Error while get count persons: " + response.status + "\n With filters: " + options);
            return -1;
        }

        const respJson = await response.json();
        return respJson.body;
    }

    public static async searchPersons(offset: number, limit: number, ...options: FilterOption[]) : Promise<PersonDTO[]> {
        const params = new URLSearchParams();
        params.append('offset', String(offset));
        params.append('limit', String(limit));
        const finalUrl: string = BASE_URL + PERSON_PATH + "/search_persons?" + params.toString();
        const response: Response = await fetch(finalUrl, {
            method: "POST",
            headers: {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(options)
        });
        if (!response.ok) {
            console.error("Error while search persons: " + response.status + "\n With filters: " + options);
            return [];
        }

        const respJson = await response.json();
        return respJson.body;
    }

    public static async createPerson(data: PersonDTO) : Promise<number> {
        const finalUrl: string = BASE_URL + PERSON_PATH + "/create_person";
        const response: Response = await fetch(finalUrl, {
            method: "POST",
            headers: {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            console.error("Error while create person: " + response.status + "\n With person: " + data);
            return -1;
        }

        const respJson = await response.json();
        return respJson.body;
    }

    public static async getPersonByID(id: number) : Promise<{coords: PersonDTO | null, count: number}> {
        const finalUrl: string = BASE_URL + PERSON_PATH + "/" + String(id);
        const response: Response = await fetch(finalUrl, {
            method: "GET",
            headers: {
                'Accept' : "application/json"
            },
        });
        if (response.status === 404) {
            console.error("Could not find person with id: " + id);
            return {coords: null, count: 0};
        } else if (!response.ok) {
            console.error("Error while get person: " + response.status + "\n With id: " + id);
            return {coords: null, count: -1};
        }

        const respJson = await response.json();
        return {coords: respJson.body, count: 1};
    }

    public static async updatePerson(id: number, person: PersonDTO) : Promise<number> {
        const finalUrl: string = BASE_URL + PERSON_PATH + "/" + String(id);
        const response: Response = await fetch(finalUrl, {
            method: "PUT",
            headers: {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(person)
        });
        if (response.status === 404) {
            console.error("Could not find person with id: " + id);
            return 0;
        } else if (!response.ok) {
            console.error("Error while update person: " + response.status + "\n With id: " + id);
            return -1;
        }

        const respJson = await response.json();
        return respJson.body;
    }

    public static async deletePerson(...options: FilterOption[]) : Promise<number> {
        const finalUrl: string = BASE_URL + PERSON_PATH + "/";
        const response: Response = await fetch(finalUrl, {
            method: "DELETE",
            headers: {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(options)
        });
        if (!response.ok) {
            console.error("Error while delete persons: " + response.status + "\n With filters: " + options);
            return -1;
        }
        const respJson = await response.json();
        return respJson.body;
    }
}

export default PersonService;