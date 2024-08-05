import { configureStore } from "@reduxjs/toolkit";
import fullDataSlice from "../states/fullDataSlice";
export default configureStore({
  reducer: {
    fullData: fullDataSlice,
  },
});
