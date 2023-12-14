import axios from "axios";
import { CuisineResponse } from '../types/recipe'

console.log("API Key:", process.env.SPOONACULAR_API_KEY);

const API_KEY = process.env.SPOONACULAR_API_KEY;

const instance = axios.create({
    baseURL: 'https://api.spoonacular.com/recipes/',
    timeout: 10000,
});

const get = async <T>(endpoint: string, config?: any) => {
    const res = await instance.get<T>(endpoint, config);
    return res.data;
};

/**
 * Get recipe based on cuisine
 * @returns
 */
export const getCuisine = (query: string) => {

    return get<CuisineResponse>(`complexSearch?query=${query}?apiKey=${API_KEY}`);
};



