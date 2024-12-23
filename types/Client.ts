import {Gender} from "./Gender.js"

export type Client = {
    id: number,
    name: string,
    gender: Gender,
    age: number,
    assignedCoachID: number
}