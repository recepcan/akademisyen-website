import { createSlice } from '@reduxjs/toolkit'

export const headerEventsSlice = createSlice({
  name: 'header',
  initialState: {
    theme: 'light',
    menu: false,
    isActive: false,
    dropdown: false,
    
  },
  reducers: {

    
    changePath: state => {
      state.isActive = !state.isActive;
    },
    toggleMenu: state => {
      state.menu = !state.menu
    },
    toggleTheme: state => {
      state.theme = state.theme==='light' ? 'dark' : 'light'
    }
  }
})

// Action creators are generated for each case reducer function
export const {  changePath, toggleMenu, toggleTheme, ddAdd,ddremove } = headerEventsSlice.actions

export default headerEventsSlice.reducer