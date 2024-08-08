/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice } from "@reduxjs/toolkit";

export interface FullDataState {
  data: {
    firstname: string;
    lastname: string;
    day: number | null;
    year: number | null;
    month: number | null;
    gender: string;
    email: string;
    phoneNumber: number | null;
    password: string;
  };
}

const initialState: FullDataState = {
  data: {
    firstname: "",
    lastname: "",
    day: null,
    year: null,
    month: null,
    gender: "",
    email: "",
    phoneNumber: null,
    password: "",
  },
};

const signupDataSlice = createSlice({
  name: "fullData",
  initialState,
  reducers: {
    updateData(state, action) {
      // retrieve key and value from payload
      const { key, value } = action.payload;
      // @ts-expect-error
      state.data[key] = value;
    },
  },
});

export const { updateData } = signupDataSlice.actions;

export default signupDataSlice.reducer;
