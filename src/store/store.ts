import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import placeholderReducer  from "./placeholderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    placeholder: placeholderReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
