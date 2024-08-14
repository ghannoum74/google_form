/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice } from "@reduxjs/toolkit";

export interface FullDataState {
  user_data: object | null;
}

const initialState: FullDataState = {
  user_data: null,
};

const signupDataSlice = createSlice({
  name: "allData",
  initialState,
  reducers: {
    addData(state, action) {
      // retrieve key and value from payload
      state.user_data = action.payload;
    },
  },
});

export const { addData } = signupDataSlice.actions;

export default signupDataSlice.reducer;
