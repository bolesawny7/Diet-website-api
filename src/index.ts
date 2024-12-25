import express from "express"
import environment from "dotenv"; environment.config();
import clientRouter from "./routes/client.router";
import workoutRouter from "./routes/workout.router";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/clients", clientRouter);
app.use("/workouts", workoutRouter);

app.listen(process.env.PORT, () => console.log(`server is up and running on endpoint http://localhost:${process.env.PORT}`));