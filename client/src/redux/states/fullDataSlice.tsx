import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    firstname: "",
    lastname: "",
    day: null,
    year: null,
    month: null,
    gender: "",
    email: "",
    password: "",
  },
};

const fullDataSlice = createSlice({
  name: "fullData",
  initialState,
  reducers: {
    updateData(state, action) {
      // retrieve key and value from payload
      const { key, value } = action.payload;
      // eslint-disable-next-line no-prototype-builtins
      state.data[key] = value;
    },
  },
});

export const { updateData } = fullDataSlice.actions;

export default fullDataSlice.reducer;
