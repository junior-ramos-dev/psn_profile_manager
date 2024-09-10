import IUserProfile from "@/models/interfaces/user/IUserProfile";
import { createSlice } from "@reduxjs/toolkit";

interface UserProfileInitialState {
  userProfile: IUserProfile;
}

const initialState: UserProfileInitialState = {
  userProfile: null,
};

const userProfileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    actionSetUseProfile: (state, { payload }) => {
      state.userProfile = payload;
    },
    actionUnsetUserProfile: (state) => {
      state.userProfile = null;
    },
  },
});

export const { actionSetUseProfile, actionUnsetUserProfile } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
