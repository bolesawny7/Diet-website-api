"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkout = getWorkout;
exports.getAllClients = getAllClients;
exports.getAllWorkouts = getAllWorkouts;
const Clients_js_1 = __importDefault(require("./Clients.js"));
const Workout_js_1 = __importDefault(require("./Workout.js"));
function getClient(id) {
    for (const client of Clients_js_1.default) {
        if (client.id === id) {
            return client;
        }
    }
    return null;
}
function getWorkout(id) {
    for (const workout of Workout_js_1.default) {
        if (workout.id === id) {
            return workout;
        }
    }
    return null;
}
function getAllClients(id) {
    return Clients_js_1.default;
}
function getAllWorkouts() {
    return Workout_js_1.default;
}
