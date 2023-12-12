export type Recipe = {
    title: string,
    readyInMinutes: number,
    servings: number,
    sourceUrl: string,
    image: string,
    summary: string,
    extendedIngredients: ExtendedIngredients[],
    instructions: string,

}

export type ExtendedIngredients = {
    name: string,
    amount: number,
    unit: string,
}

export type Cuisine = {
    title: string,
    image: string
}

export type CuisineResponse = {
    results: Cuisine[]
}