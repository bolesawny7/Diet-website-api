import {WorkoutType} from "./WorkoutType";
import {Meal} from "./Meal"

export type Workout = {
    id: number,
    clientId: number,
    coachId: number,
    objective: WorkoutType,
    breakfast: Meal,
    lunch: Meal,
    dinner: Meal
}