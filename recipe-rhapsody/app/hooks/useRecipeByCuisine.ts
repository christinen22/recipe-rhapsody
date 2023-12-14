'use client'

import { CuisineResponse } from "../types/recipe";
import * as API from '../api/Spoonacular'
import { useQuery } from "@tanstack/react-query";

const useRecipeByCuisine = (cuisine: string) => {
    return useQuery<CuisineResponse>(
        ['type-cuisine', cuisine],
        () => API.getCuisine(cuisine),

    );
}

export default useRecipeByCuisine;
