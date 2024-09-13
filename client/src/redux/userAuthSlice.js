import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  data:[],
  adminMenu:false,

};






const userAuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setadminMenu:(state)=>{
       state.adminMenu=!state.adminMenu
    },
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
   
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signoutSuccess,
  setadminMenu
  
} = userAuthSlice.actions;

export default userAuthSlice.reducer;