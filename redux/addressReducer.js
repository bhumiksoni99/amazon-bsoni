import { createSlice } from "@reduxjs/toolkit";

export const AddressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    defaultId: undefined,
  },
  reducers: {
    addAddress: (state, action) => {
      state.addresses = action.payload;
    },
    removeAddress: (state, action) => {
      const address = state.addresses.filter(
        (address) => address._id !== action.payload._id
      );

      state.addresses = address;
    },
    setAsDefault: (state, action) => {
      state.defaultId = action.payload._id;
    },
  },
});

export const { addAddress, removeAddress, setAsDefault } = AddressSlice.actions;

export default AddressSlice.reducer;
