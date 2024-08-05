import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: "",
  lastname: "",
  day: null,
  year: null,
  month: null,
  gender: "",
  email: "",
  password: "",
};

const fullDataSlice = createSlice({
  name: "fullData",
  initialState,
  reducers: {
    setFullName(state, action) {
      state.firstname = action.payload.firstname;
    },
    setlastName(state, action) {
      state.lastname = action.payload.lastname;
    },
    setDay(state, action) {
      state.day = action.payload.day;
    },
    setYear(state, action) {
      state.year = action.payload.year;
    },
    setMonth(state, action) {
      state.month = action.payload.month;
    },
    setEmail(state, action) {
      state.email = action.payload.email;
    },
    setPasswors(state, action) {
      state.password = action.payload.password;
    },
  },
});

export const {
  setFullName,
  setlastName,
  setDay,
  setYear,
  setMonth,
  setEmail,
  setPasswors,
} = fullDataSlice.actions;

export default fullDataSlice.reducer;
