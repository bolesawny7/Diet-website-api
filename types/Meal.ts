import { Ingredient } from "./Ingredient"

export type Meal = {
    name: string,
    carbohydrates: number,
    ingredients: Ingredient[],
    recipe: string
};

