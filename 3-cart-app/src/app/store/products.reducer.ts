import { createReducer, on } from "@ngrx/store"
import { findAll, load } from "./products.actions"
import { Product } from "../models/product";

export interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: []
}

export const productsReducer = createReducer(
    initialState,
    on(load, (state, payload) =>{
        return {
            products: [... payload.products]
        }
    }),
    //effects
    on(findAll, state => {
        return {
            products: [... state.products]
        }
    })
)