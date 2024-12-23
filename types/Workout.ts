import { DayMeals } from "./DayMeals";
import { WorkoutType } from "./WorkoutType";

export type Workout = {
    id: number;
    coachId: number;
    clientId: number;
    type: WorkoutType;
    saturday: DayMeals;
    sunday: DayMeals;
    monday: DayMeals;
    tuesday: DayMeals;
    wednesday: DayMeals;
    thursday: DayMeals;
    friday: DayMeals;
};