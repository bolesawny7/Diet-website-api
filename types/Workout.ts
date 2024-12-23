import {WorkoutType} from "./WorkoutType";
import {DayMeals} from "./DayMeals"

export type Workout = {
    id: number,
    clientId: number,
    coachId: number,
    objective: WorkoutType,
    saturday: DayMeals;
    sunday: DayMeals;
    monday: DayMeals;
    tuesday: DayMeals;
    wednesday: DayMeals;
    thursday: DayMeals;
    friday: DayMeals;
}
