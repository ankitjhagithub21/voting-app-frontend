import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuth: false,
    loading:false,
    
  },
  reducers: {
    loginUser: state => {
      state.isAuth = true;
      state.loading = false
    },
    logoutUser: state => {
      state.user = null;
      state.isAuth = false;
      state.loading = false
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false
      
    },
    setLoading:(state,action)=>{
      state.loading = action.payload
    }
   
  },
});

export const { loginUser, logoutUser, setUser, setLoading} = authSlice.actions;

export default authSlice.reducer;
