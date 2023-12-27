import { createAction, props } from "@ngrx/store";
import { order } from "src/interfaces/order.interface";

export const createNewOrder = createAction('[Cart Comp - Create New Product', props<{order : order}>())