  import { createSlice } from '@reduxjs/toolkit'

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    user: {}
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
    },
    removeUser: state => {
      state.user = {}
    }
  }
});

export const { setUser, removeUser } = userInfoSlice.actions;

export default userInfoSlice;
