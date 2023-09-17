import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Import Interface
import { AuthState } from '@/interfaces'

// InitialState
const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: true,
  token: null,
  user: {},
}

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    setIsAuthenticating: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticating = action.payload
    },
    setToken: (state, action: PayloadAction<null | string>) => {
      state.token = action.payload
    },
    setUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload
    },
  }
})

export const { setIsAuthenticated, setIsAuthenticating, setToken, setUser } = authSlice.actions
export default authSlice.reducer
