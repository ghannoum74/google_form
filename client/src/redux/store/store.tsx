import { configureStore } from "@reduxjs/toolkit";
import loginDataSlice from "../states/loginDataSlics";
import signupDataSlice from "../states/signupDataSlice";
import formCompletionSlice from "../states/protectRouteSlice";
export default configureStore({
  reducer: {
    fullData: signupDataSlice,
    loginData: loginDataSlice,
    formCompletion: formCompletionSlice,
  },
});
