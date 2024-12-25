import express from "express";
import workouts from "../database/Workout";
import { Workout } from "../types/Workout";
import { DayMeals } from "../types/DayMeals";

const workoutRouter = express.Router();

workoutRouter.get("/", (req, res) => {
    res.json({"Workouts" : workouts});
});


workoutRouter.post("/", (req, res) => {
    try {
    const newWorkout: Workout = req.body;

    // Validate basic properties
    if (
        typeof newWorkout.id !== "number" ||
        typeof newWorkout.coachId !== "number" ||
        typeof newWorkout.clientId !== "number" ||
        (newWorkout.type !== "weight loss" &&
        newWorkout.type !== "muscle gain")
    ) {
        throw new Error("Invalid basic Workout properties.");
    }

    // Validate each day's meals
    const days = [
        "saturday",
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
    ] as const;

    for (const day of days) {
        const meals: DayMeals = newWorkout[day];
        if (
        !meals ||
        typeof meals.breakfast !== "object" ||
        typeof meals.lunch !== "object" ||
        typeof meals.dinner !== "object"
        ) {
        throw new Error(`Invalid meal structure for ${day}.`);
        }

        // Validate each meal
        for (const meal of [meals.breakfast, meals.lunch, meals.dinner]) {
        if (
            typeof meal.name !== "string" ||
            typeof meal.carbohydrates !== "number" ||
            !Array.isArray(meal.ingredients) ||
            typeof meal.recipe !== "string"
        ) {
            throw new Error(
            `Invalid meal structure: ${JSON.stringify(meal)}`
            );
        }

        // Validate ingredients
        for (const ingredient of meal.ingredients) {
            if (
            typeof ingredient.name !== "string" ||
            typeof ingredient.amount !== "number"
            ) {
            throw new Error(
                `Invalid ingredient structure: ${JSON.stringify(ingredient)}`
            );
            }
        }
        }
    }

    workouts.push(newWorkout);
    // If all validations pass
    res
        .status(201)
        .json({ status: "Workout added successfully", workout: newWorkout });
    } catch (error: any) {
    res.status(400).json({ error: error.message });
    }
});


workoutRouter.patch("/:id", (req, res) => {
  try {
    const requiredWorkoutId: number = Number(req.params.id);
    const updatedWorkout: Partial<Workout> = req.body;

    for (let workout of workouts) {
      if (workout.id === requiredWorkoutId) {
        // Validate and update `coachId`
        if (typeof updatedWorkout.coachId === "number") {
          workout.coachId = updatedWorkout.coachId;
        }

        // Validate and update `clientId`
        if (typeof updatedWorkout.clientId === "number") {
          workout.clientId = updatedWorkout.clientId;
        }

        // Validate and update `type`
        if (
          updatedWorkout.type === "weight loss" ||
          updatedWorkout.type === "muscle gain"
        ) {
          workout.type = updatedWorkout.type;
        }

        // Validate and update daily meals
        const days = [
          "saturday",
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
        ] as const;

        for (const day of days) {
          const updatedDayMeals = updatedWorkout[day];

          if (updatedDayMeals) {
            const currentDayMeals = workout[day];

            // Validate and update `breakfast`
            if (typeof updatedDayMeals.breakfast === "object") {
              const { name, carbohydrates, ingredients, recipe } =
                updatedDayMeals.breakfast;
              currentDayMeals.breakfast.name =
                typeof name === "string"
                  ? name
                  : currentDayMeals.breakfast.name;
              currentDayMeals.breakfast.carbohydrates =
                typeof carbohydrates === "number"
                  ? carbohydrates
                  : currentDayMeals.breakfast.carbohydrates;
              currentDayMeals.breakfast.ingredients = Array.isArray(ingredients)
                ? ingredients
                : currentDayMeals.breakfast.ingredients;
              currentDayMeals.breakfast.recipe =
                typeof recipe === "string"
                  ? recipe
                  : currentDayMeals.breakfast.recipe;
            }

            // Validate and update `lunch`
            if (typeof updatedDayMeals.lunch === "object") {
              const { name, carbohydrates, ingredients, recipe } =
                updatedDayMeals.lunch;
              currentDayMeals.lunch.name =
                typeof name === "string" ? name : currentDayMeals.lunch.name;
              currentDayMeals.lunch.carbohydrates =
                typeof carbohydrates === "number"
                  ? carbohydrates
                  : currentDayMeals.lunch.carbohydrates;
              currentDayMeals.lunch.ingredients = Array.isArray(ingredients)
                ? ingredients
                : currentDayMeals.lunch.ingredients;
              currentDayMeals.lunch.recipe =
                typeof recipe === "string"
                  ? recipe
                  : currentDayMeals.lunch.recipe;
            }

            // Validate and update `dinner`
            if (typeof updatedDayMeals.dinner === "object") {
              const { name, carbohydrates, ingredients, recipe } =
                updatedDayMeals.dinner;
              currentDayMeals.dinner.name =
                typeof name === "string" ? name : currentDayMeals.dinner.name;
              currentDayMeals.dinner.carbohydrates =
                typeof carbohydrates === "number"
                  ? carbohydrates
                  : currentDayMeals.dinner.carbohydrates;
              currentDayMeals.dinner.ingredients = Array.isArray(ingredients)
                ? ingredients
                : currentDayMeals.dinner.ingredients;
              currentDayMeals.dinner.recipe =
                typeof recipe === "string"
                  ? recipe
                  : currentDayMeals.dinner.recipe;
            }
          }
        }

        // Respond with the updated workout
        res.status(200).json({
          status: "Workout updated successfully",
          workout,
        });
        return;
      }
    }

    // If no workout is found with the given ID
    res.status(404).json({ error: "Workout not found" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

workoutRouter.delete("/:id", (req, res) => {
    const requiredId: number = Number(req.params.id);

    let index = 0;
    for (;index < workouts.length; index++) {
        if (workouts[index].id === requiredId) {
            workouts.splice(index, 1);
            res.json({"status" : "workout deleted successfully"});
        }
    }

    res.status(400).json({"status" : "workout not found"});
});

export default workoutRouter;