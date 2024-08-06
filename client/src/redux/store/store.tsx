import { configureStore } from "@reduxjs/toolkit";
import fullDataSlice from "../states/fullDataSlice";
import loginDataSlice from "../states/loginDataSlics";
export default configureStore({
  reducer: {
    fullData: fullDataSlice,
    loginData: loginDataSlice,
  },
});
