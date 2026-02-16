import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1️⃣ Type for slice state
interface UserExistState {
  value: boolean;
}

// 2️⃣ Initial state
const initialState: UserExistState = {
  value: false,
};

// 3️⃣ Slice creation
const userExistSlice = createSlice({
  name: "userExist",
  initialState,
  reducers: {
    setUserExist: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload; // true / false
    },
  },
});

// 4️⃣ Export actions & reducer
export const { setUserExist } = userExistSlice.actions;
export default userExistSlice.reducer;
