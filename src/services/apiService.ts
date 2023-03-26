import axios from 'axios';
import { CountryI } from '../models/Country';

export default class ApiService {
    public static readonly API_URL = 'http://localhost:3001';

    public static async getCountries(): Promise<CountryI[]> {
        const response = await axios.get(`${ApiService.API_URL}/countries`);
        return response.data.countries;
    }

    public static async getCountry(code: string): Promise<CountryI> {
        const response = await axios.get(
            `${ApiService.API_URL}/countries/${code}`
        );
        return response.data.country;
    }

    public static async signUp(
        name: string,
        password: string,
        created_at: string
    ): Promise<boolean> {
        const response = await axios.post(`${ApiService.API_URL}/users`, {
            user: {
                name,
                password,
                created_at
            }
        });
        if (response.status === 200) {
            return true;
        }
        return false;
    }

    public static async getUsersCount(): Promise<number> {
        const response = await axios.get(`${ApiService.API_URL}/users`);
        return response.data.count;
    }
}
