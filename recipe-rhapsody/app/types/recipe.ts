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
};

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

export type RecipeAnalyzedInstruction = {
    name: string;
    steps: RecipeInstruction[];
};

export type RecipeInstruction = {
    number: number;
    step: string;
    ingredients: [];
    equipment: Equipment[];
};

type Equipment = {
    id: number;
    name: string;
    localizedName: string;
    image: string;
};

export type ExtendedIngredients = {
    name: string,
    amount: number,
    unit: string,
}

export type Cuisine = {
    id: number,
    title: string,
    image: string
}

export type CuisineResponse = {
    results: Cuisine[]
}