import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorData: {
    header: "",
    caption: "",
    status: "",
  },
};

const errorDataSlice = createSlice({
  name: "getErrorData",
  initialState,
  reducers: {
    setErrorData: (state, action) => {
      const { header, caption, status } = action.payload;

      state.errorData.header = header;
      state.errorData.caption = caption;
      state.errorData.status = status;
    },
    clearErrorData: (state) => {
      state.errorData = {
        header: "",
        caption: "",
        status: "",
      };
    },
  },
});

export const { setErrorData, clearErrorData } = errorDataSlice.actions;
export default errorDataSlice.reducer;
