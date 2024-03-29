//Function that takes objects params as a argument and clean up url and returns a query-string

export const buildQueryParams = (params: Record<string, any>, additionalParams: Record<string, any> = {}) => {
    // Combine the provided params and additionalParams into a new object
    const allParams = { ...params, ...additionalParams };

    // Filter out parameters with undefined values, then encode key-value pairs for URL
    const queryParams = Object.entries(allParams)
        .filter(([_, value]) => value !== undefined)
        .map(
            ([key, value]) =>
                // encodeURIComponent handles special characters in the URL
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

    return queryParams ? `?${queryParams}` : "";
};


//Create and return Header-object to http request
export const getHeaders = (): Headers => {
    // Initialize a new Headers object
    const headers = new Headers();
    headers.append("x-api-key", process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY as string);
    headers.append("Content-Type", "application/json");
    return headers;
};