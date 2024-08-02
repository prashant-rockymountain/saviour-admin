import { createSlice } from "@reduxjs/toolkit";


const logoutAllDataSlice = createSlice({
    name: "logoutAllDataSlice",
    initialState: {},
    reducers: {
        clearallstates() {

        }
    }
})

export default logoutAllDataSlice.reducer
export const { clearallstates } = logoutAllDataSlice.actions