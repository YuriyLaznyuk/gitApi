import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface gitState {
  repo: any;
  user: any;
  repos: Array<any>;
  show: boolean;
}
const initialState: gitState = {
  repo: [],
  repos: [],
  show: false,
  user: {},
};

export const gitSlice = createSlice({
  name: "gitApi",
  initialState,
  reducers: {
    usersRepo: (state, action: PayloadAction<Array<any>>) => {
      state.repo = action.payload;
    },
    userRepos: (state, action: PayloadAction<Array<any>>) => {
      state.repos = action.payload;
    },
    getUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
    getShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});
export const { userRepos, usersRepo, getShow, getUser } = gitSlice.actions;
export default gitSlice.reducer;
