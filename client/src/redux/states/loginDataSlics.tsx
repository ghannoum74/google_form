/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice } from "@reduxjs/toolkit";

export interface LoginData {
  data: {
    email: string;
    password: string;
  };
}
const initialState: LoginData = {
  data: {
    email: "",
    password: "",
  },
};

const loginDataSlice = createSlice({
  name: "loginData",
  initialState,
  reducers: {
    updateData(state, action) {
      const { key, value } = action.payload;
      // @ts-expect-error
      state.data[key] = value;
    },
  },
});

export const { updateData } = loginDataSlice.actions;

export default loginDataSlice.reducer;
