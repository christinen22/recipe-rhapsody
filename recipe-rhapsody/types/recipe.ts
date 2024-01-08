export type Recipe = {
    id: number,
    title: string,
    readyInMinutes: number,
    servings: number,
    sourceUrl: string,
    image: string,
    summary: string,
    extendedIngredients: ExtendedIngredients[],
    instructions: string,

}
export type Recipes = {
    results: Recipe[];
    offset: number,
    number: number,
    totalResults: number
};

export type ExtendedIngredients = {
    name: string,
    amount: number,
    unit: string,
}

export type RandomRecipe = {
    recipes: Recipe[]
}

export type RecipeSummary = {
    id: number;
    title: string;
    summary: string;
};

export type Ingredient = {
    name: string;
    image: string;
    amount: {
        metric: {
            value: number;
            unit: string;
        };
        us: {
            value: number;
            unit: string;
        };
    };
};

export type RecipeIngredients = {
    ingredients: Ingredient[];
};

export type IngredientSearch = {
    id: number,
    title: string,
    image: string,
}


export type Cuisine = {
    id: number,
    title: string,
    image: string
}

export type CuisineResponse = {
    results: Cuisine[]
}

export type User = {
    email: string,
}