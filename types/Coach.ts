import {Gender} from "./Gender"

export type Coach = {
    id: number,
    name: string,
    gender: Gender,
    age: number,
    ClientsIds: number[]
}