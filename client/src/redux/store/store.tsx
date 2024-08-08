import { configureStore } from "@reduxjs/toolkit";
import loginDataSlice from "../states/loginDataSlics";
import signupDataSlice from "../states/signupDataSlice";
export default configureStore({
  reducer: {
    fullData: signupDataSlice,
    loginData: loginDataSlice,
  },
});
