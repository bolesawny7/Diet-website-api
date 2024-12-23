import { Gender } from "./Gender";

export type Client = {
    id: number,
    name: string,
    gender: Gender,
    age: number,
    assignedCoachId: number
};