import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './types';

const initialState: UserState = {
  _id: '',
  name: '',
  email: '',
  profile_pic: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profile_pic = action.payload.profile_pic;
      state.token = action.payload.token;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state._id = '';
      state.name = '';
      state.email = '';
      state.profile_pic = '';
      state.token = '';
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
