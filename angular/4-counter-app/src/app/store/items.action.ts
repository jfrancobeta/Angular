import { createAction, props } from "@ngrx/store";

export const increment = createAction('[Counter Component] Increment', props<{mul:number}>())//,payload
export const decrement = createAction('[Counter Component] decrement', props<{mul:number}>())
export const reset = createAction('[Counter Component] reset')