import { createSlice } from "@reduxjs/toolkit";

const editDataSlice = createSlice({
  name: "editDataSlice",
  initialState: {
    editdata: null,
    storeUniversityData: null,
  },
  reducers: {
    addeditdata(state, action) {
      state.editdata = action.payload;
    },
    storeUniversityData(state, action) {
      state.storeUniversityData = action.payload;
    },
  },
});

export default editDataSlice.reducer;
export const { addeditdata, storeUniversityData } = editDataSlice.actions;
