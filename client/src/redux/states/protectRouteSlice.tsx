import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFormComplete: false,
  completedPage: "",
};

const formCompletionSlice = createSlice({
  name: "formCompletion",
  initialState,
  reducers: {
    setFormComplete: (state, action) => {
      // so here i distructure the actions comes from the dispatch
      // so now not only i check if complete or not therefore i add the completed pages
      state.isFormComplete = action.payload;
    },
    saveCurrentPage: (state, action) => {
      state.completedPage = action.payload;
    },
  },
});
export const { setFormComplete, saveCurrentPage } = formCompletionSlice.actions;
export default formCompletionSlice.reducer;
