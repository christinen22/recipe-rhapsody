/**
 * 
 * Utility functions
 * 
 * @param params 
 * @returns 
 */

//Function that takes objects params as a argument and clean up url and returns a query-string

export const buildQueryParams = (params: Record<string, any>) => {
    const queryParams = Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(
            ([key, value]) =>
                //encodeURIComponent handles special characters in the URL
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

    return queryParams ? `?${queryParams}` : "";
};

export const getHeaders = (): Headers => {
    const headers = new Headers();
    headers.append("x-api-key", process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY as string);
    headers.append("Content-Type", "application/json");
    return headers;
};