"use client"
import { configureStore } from "@reduxjs/toolkit";
import userExistReducer from "./userloginslice/userloginslice";
import userDetailReducer from "./userdetailslice/userdetailslice";


// Create Redux store
const store = configureStore({
  reducer: {
    userExist: userExistReducer, // slice ka reducer
    userdetail:userDetailReducer
    
    // Agar aur slices add karna ho → yahan add kar sakte ho
  },
});

// Infer types for state and dispatch (TypeScript ke liye)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export{store}
