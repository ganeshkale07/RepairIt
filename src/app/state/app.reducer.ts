import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { InitialState, State } from "./app.state";
import * as productActions from "./app.actions"

//selector

const getProductSliceState = createFeatureSelector<State>('productSliceState');

export const getAllOrders = createSelector(getProductSliceState ,(state) => state.order);

export const isAdminLoggedIn = createSelector(getProductSliceState,(state:State) => state.isAdmin);

export const productSliceReducer = createReducer(InitialState,
    on(productActions.createNewOrder , (state,orderInfo):State => {
        if(state.order){
            return{
                ...state,
                order : [...state.order , orderInfo.order]
            }
        }else{
            return{
                ...state,
                order : [orderInfo.order]
            }
        }
    })) 