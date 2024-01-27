import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemAlreadyPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemAlreadyPresent) {
        itemAlreadyPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );

      state.cart = removeItem;
    },
    incrementCount: (state, action) => {
      const itemAlreadyPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );

      itemAlreadyPresent.quantity++;
    },
    decrementCount: (state, action) => {
      const itemAlreadyPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemAlreadyPresent?.quantity === 1) {
        itemAlreadyPresent.quantity = 0;
        const removeItem = state.cart.filter(
          (item) => item.id !== action.payload.id
        );

        state.cart = removeItem;
      } else {
        itemAlreadyPresent.quantity--;
      }
    },
    cleanCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementCount,
  decrementCount,
  cleanCart,
} = CartSlice.actions;

export default CartSlice.reducer;
