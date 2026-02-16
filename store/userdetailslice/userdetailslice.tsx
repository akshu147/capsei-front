import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserDetailState {
  value: any
}

const initialState: UserDetailState = {
  value: []
}

const userDetailSlice = createSlice({
  name: "userdetail",
  initialState,
  reducers: {
    setUserDetail: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
    clearUserDetail: (state) => {
      state.value = null
    }
  }
})

export const { setUserDetail, clearUserDetail } = userDetailSlice.actions
export default userDetailSlice.reducer
