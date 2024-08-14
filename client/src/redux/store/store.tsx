import { configureStore } from "@reduxjs/toolkit";
import loginDataSlice from "../states/loginDataSlics";
import signupDataSlice from "../states/signupDataSlice";
import formCompletionSlice from "../states/protectRouteSlice";
import ErrorDataSlice from "../states/ErrorDataSlice";
import FullUserDataSlice from "../states/FullUserDataSlice";
export default configureStore({
  reducer: {
    fullData: signupDataSlice,
    loginData: loginDataSlice,
    formCompletion: formCompletionSlice,
    getErrorData: ErrorDataSlice,
    fullUserData: FullUserDataSlice,
  },
});
