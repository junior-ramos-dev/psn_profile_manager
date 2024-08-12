import { UserProfile } from "@/models/types/rtkQuery/user";
import { createSlice } from "@reduxjs/toolkit";

interface UserProfileInitialState {
  userProfile: UserProfile;
}

const initialState: UserProfileInitialState = {
  userProfile: null,
};

const userSlice = createSlice({
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

export default userSlice.reducer;
