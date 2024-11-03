import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset } from "./items.action";

//unico canal donde se puede cambiar la info
export const initalState = 0;
export const counterReducer = createReducer(
    0,
    on(increment, (state, payload) =>  state+1 * payload.mul), 
    on(decrement, (state,payload) => state-1 + payload.mul),
    on(reset, (state) =>  state = 0)

)
