import FilterOption from "../dtos/FilterOption";
import {BASE_URL, COORDINATES_PATH} from "../consts/HttpConsts";
import CoordinatesDTO from "../dtos/CoordinatesDTO";

class CoordinatesService {
    public static async getCount(...options: FilterOption[]) : Promise<number> {
        const finalUrl: string = BASE_URL + COORDINATES_PATH + "/get_count";
        const response: Response = await fetch(finalUrl, {
            method: "POST",
            headers: {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(options)
        });
        if (!response.ok) {
            console.error("Error while get count coordinates: " + response.status + "\n With filters: " + options);
            return -1;
        }

        const respJson = await response.json();
        return respJson.body;
    }

    public static async searchCoordinates(offset: number, limit: number, ...options: FilterOption[]) : Promise<CoordinatesDTO[]> {
        const params = new URLSearchParams();
        params.append('offset', String(offset));
        params.append('limit', String(limit));
        const finalUrl: string = BASE_URL + COORDINATES_PATH + "/search_coordinates?" + params.toString();
        const response: Response = await fetch(finalUrl, {
            method: "POST",
            headers: {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(options)
        });
        if (!response.ok) {
            console.error("Error while search coordinates: " + response.status + "\n With filters: " + options);
            return [];
        }

        const respJson = await response.json();
        return respJson.body;
    }

    public static async createCoordinates(data: CoordinatesDTO) : Promise<number> {
        const finalUrl: string = BASE_URL + COORDINATES_PATH + "/create_coordinates";
        const response: Response = await fetch(finalUrl, {
            method: "POST",
            headers: {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            console.error("Error while create coordinates: " + response.status + "\n With coordinates: " + data);
            return -1;
        }

        const respJson = await response.json();
        return respJson.body;
    }

    public static async getCoordinatesByID(id: number) : Promise<{coords: CoordinatesDTO | undefined, count: number}> {
        const finalUrl: string = BASE_URL + COORDINATES_PATH + "/" + String(id);
        const response: Response = await fetch(finalUrl, {
            method: "GET",
            headers: {
                'Accept' : "application/json"
            },
        });
        if (response.status === 404) {
            console.error("Could not find coordinates with id: " + id);
            return {coords: undefined, count: 0};
        } else if (!response.ok) {
            console.error("Error while get coordinates: " + response.status + "\n With id: " + id);
            return {coords: undefined, count: -1};
        }

        const respJson = await response.json();
        return {coords: respJson.body, count: 1};
    }

    public static async updateCoordinates(id: number, coords: CoordinatesDTO) : Promise<number> {
        const finalUrl: string = BASE_URL + COORDINATES_PATH + "/" + String(id);
        const response: Response = await fetch(finalUrl, {
            method: "PUT",
            headers: {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(coords)
        });
        if (response.status === 404) {
            console.error("Could not find coordinates with id: " + id);
            return 0;
        } else if (!response.ok) {
            console.error("Error while update coordinates: " + response.status + "\n With id: " + id);
            return -1;
        }

        const respJson = await response.json();
        return respJson.body;
    }

    public static async deleteCoordinates(id: number) : Promise<number> {
        const finalUrl: string = BASE_URL + COORDINATES_PATH + "/" + String(id);
        const response: Response = await fetch(finalUrl, {
            method: "DELETE",
            headers: {
                'Accept' : "application/json",
            },
        });
        if (!response.ok) {
            console.error("Error while delete coordinates: " + response.status + "\n With id: " + id);
            return -1;
        }
        const respJson = await response.json();
        return respJson.body;
    }
}

export default CoordinatesService;