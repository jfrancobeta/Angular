import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../models/cartitem';
import { add, remove, total } from './items.actions';

export interface ItemsState {
  items: CartItem[];
  total: number;
}
export const initalState: ItemsState = {
  items: JSON.parse(sessionStorage.getItem('cart')!) || [],
  total: 0,
};
export const itemsReducer = createReducer(
  initalState,
  on(add, (state, payload) => {
    const HasIteem = state.items.find((item : CartItem) => {
      console.log("en el add")
      return item.product.id === payload.product.id;
    });
    if (HasIteem) {
      return {
        items: (state.items = state.items.map((item: CartItem) => {
          if (item.product.id === payload.product.id) {
            return {
              ... item,
              quantity: item.quantity + 1,
            }
           
          } 
          return item;
        })),
        total: state.total,
      };
    } else {
      return {
        items: ([
          ...state.items,
          { product: { ...payload.product }, quantity: 1 },
        ]),
        total: state.total,
      };
    }
  }),
  on(remove, (state, payload) => {
    return {
      items: (state.items.filter(
        (item) => item.product.id != payload.id
      )),
      total: state.total,
    };
  }),
  on(total, (state) => {
    return {
      items: state.items,
      total: state.items.reduce(
        (accumulator, item) => accumulator + item.quantity * item.product.price,
        0
      ),
    };
  })
);
