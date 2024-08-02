import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'loginslice',
  initialState: {
    logindata: null
  },
  reducers: {
    userlogin(state, action) {
      state.logindata = action.payload
    }
  }
})

export default loginSlice.reducer

export const { userlogin } = loginSlice.actions
