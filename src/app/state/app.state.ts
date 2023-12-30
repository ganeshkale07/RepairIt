import { order } from "src/interfaces/order.interface";
import Product from "src/interfaces/product";

export interface State {
    isAdmin : boolean,
    cartItem : Product[] | null,
    order : order[] | null
}

export const InitialState : State = {
    isAdmin : false,
    cartItem : null,
    order : null
}