import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLeftNavOpen: false,
  leftNavWidth: 240,
  selectedLeftNavMenuKeys: ['dashboard']
}

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setIsLeftNavOpen: (state, action) => {
      state.isLeftNavOpen = action.payload
    },
    setLeftNavWidth: (state, action) => {
      state.leftNavWidth = action.payload
    },
    setSelectedLeftNavMenuKeys: (state, action) => {
      state.selectedLeftNavMenuKeys = action.payload
    }
  }
})

export const { setIsLeftNavOpen, setLeftNavWidth, setSelectedLeftNavMenuKeys } = navSlice.actions
export default navSlice.reducer
