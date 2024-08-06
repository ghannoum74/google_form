import { createSlice } from "@reduxjs/toolkit";

export interface LoginData {
  email: string;
  password: string;
}
const initialState: LoginData = {
  email: "",
  password: "",
};

const loginDataSlice = createSlice({
  name: "loginData",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
  },
});

export const { setEmail, setPassword } = loginDataSlice.actions;

export default loginDataSlice.reducer;
