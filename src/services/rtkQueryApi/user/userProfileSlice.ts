import IUserProfile from "@/models/interfaces/user/IUserProfile";
import { createSlice } from "@reduxjs/toolkit";

interface UserProfileInitialState {
  profile: IUserProfile;
}

const initialState: UserProfileInitialState = {
  profile: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    actionSetUseProfile: (state, { payload }) => {
      state.profile = payload;
    },
    actionUnsetUserProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { actionSetUseProfile, actionUnsetUserProfile } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
