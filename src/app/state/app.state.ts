import { order } from "src/interfaces/order.interface";

export interface State {
    isAdmin : boolean,
    order : order[] | null
}

export const InitialState : State = {
    isAdmin : false,
    order : null
}