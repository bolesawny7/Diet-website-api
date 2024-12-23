import {Ingredient} from "./Ingredient.ts";

export type Meal = {
    name: string,
    carbohydrates: number,
    ingredients: Ingredient[]
    description: string
}