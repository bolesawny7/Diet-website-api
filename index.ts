import express from "express"
import environment from "dotenv"; environment.config();
import clientRouter from "./routes/client.router.js";
import workoutRouter from "./routes/workout.router.js";

const app = express();

app.use(express.json());

app.use("/clients", clientRouter);
app.use("/workouts", workoutRouter);

app.listen(process.env.PORT, () => console.log("server is up and running"));