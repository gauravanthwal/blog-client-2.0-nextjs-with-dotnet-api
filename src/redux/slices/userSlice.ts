// store/slices/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {

    }
};

const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
        state.user = action.payload
    },
    logoutUser: (state) => {
        state.user = {};
        localStorage.removeItem("token");
    },
  },
});

export const { setUserDetails, logoutUser } = counterSlice.actions;
export default counterSlice.reducer;
