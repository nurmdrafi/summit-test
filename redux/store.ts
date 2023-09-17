import { configureStore, Store } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"

// Import Reducers
import authReducer from "./reducers/authReducer"
import navReducer from "./reducers/navReducer"

const store: Store = configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer
  }
})

// Define types for state and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => (AppDispatch | any) = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store