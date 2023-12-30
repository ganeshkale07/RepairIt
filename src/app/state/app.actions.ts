import { createAction, props } from "@ngrx/store";
import { order } from "src/interfaces/order.interface";
import Product from "src/interfaces/product";

export const createNewOrder = createAction('[Cart Comp - Create New Product', props<{order : order}>())

export const updateCart = createAction('[Menu Comp] - Update Product to Cart',props<{products : Product[] | null}>());
