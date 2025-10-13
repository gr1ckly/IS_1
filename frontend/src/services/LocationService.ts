import FilterOption from "../dtos/FilterOption";
import {BASE_URL, COORDINATES_PATH, LOCATION_PATH} from "../consts/HttpConsts";
import LocationDTO from "../dtos/LocationDTO";

class LocationService {
    public static async getCount(...options: FilterOption[]) : Promise<number> {
        const finalUrl: string = BASE_URL + LOCATION_PATH + "/get_count";
        const response: Response = await fetch(finalUrl, {
            method: "POST",
            headers: {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(options)
        });
        if (!response.ok) {
            console.error("Error while get count locations: " + response.status + "\n With filters: " + options);
            return -1;
        }

        const respJson = await response.json();
        return respJson;
    }

    public static async searchLocations(offset: number, limit: number, ...options: FilterOption[]) : Promise<LocationDTO[]> {
        const params = new URLSearchParams();
        params.append('offset', String(offset));
        params.append('limit', String(limit));
        const finalUrl: string = BASE_URL + LOCATION_PATH + "/search_locations?" + params.toString();
        const response: Response = await fetch(finalUrl, {
            method: "POST",
            headers: {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(options)
        });
        if (!response.ok) {
            console.error("Error while search locations: " + response.status + "\n With filters: " + options);
            return [];
        }

        const respJson = await response.json();
        return respJson;
    }

    public static async createLocation(data: LocationDTO) : Promise<number> {
        const finalUrl: string = BASE_URL + LOCATION_PATH + "/create_location";
        const response: Response = await fetch(finalUrl, {
            method: "POST",
            headers: {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            console.error("Error while create location: " + response.status + "\n With location: " + data);
            return -1;
        }

        const respJson = await response.json();
        return respJson;
    }

    public static async getLocationByID(id: number) : Promise<{coords: LocationDTO | undefined, count: number}> {
        const finalUrl: string = BASE_URL + LOCATION_PATH + "/" + String(id);
        const response: Response = await fetch(finalUrl, {
            method: "GET",
            headers: {
                'Accept' : "application/json"
            },
        });
        if (response.status === 404) {
            console.error("Could not find location with id: " + id);
            return {coords: undefined, count: 0};
        } else if (!response.ok) {
            console.error("Error while get location: " + response.status + "\n With id: " + id);
            return {coords: undefined, count: -1};
        }

        const respJson = await response.json();
        return {coords: respJson, count: 1};
    }

    public static async updateLocation(id: number, location: LocationDTO) : Promise<number> {
        const finalUrl: string = BASE_URL + LOCATION_PATH + "/" + String(id);
        const response: Response = await fetch(finalUrl, {
            method: "PUT",
            headers: {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(location)
        });
        if (response.status === 404) {
            console.error("Could not find location with id: " + id);
            return 0;
        } else if (!response.ok) {
            console.error("Error while update location: " + response.status + "\n With id: " + id);
            return -1;
        }

        const respJson = await response.json();
        return respJson;
    }

    public static async deleteLocation(id: number) : Promise<number> {
        const finalUrl: string = BASE_URL + LOCATION_PATH + "/" + String(id);
        const response: Response = await fetch(finalUrl, {
            method: "DELETE",
            headers: {
                'Accept' : "application/json",
            },
        });
        if (!response.ok) {
            console.error("Error while delete location: " + response.status + "\n With id: " + id);
            return -1;
        }
        const respJson = await response.json();
        return respJson;
    }
}

export default LocationService;