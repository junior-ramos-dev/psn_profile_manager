import { createSlice } from "@reduxjs/toolkit";

interface UserPreferencesInitialState {
  themeMode: string;
  themeColor: string;
}

const initialState: UserPreferencesInitialState = {
  themeMode: null,
  themeColor: null,
};

const userPreferencesSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    actionSetUsePreferences: (
      state,
      { payload: { themeMode, themeColor } }
    ) => {
      state.themeMode = themeMode;
      state.themeColor = themeColor;
    },
    actionUnsetUserPreferences: (state) => {
      state.themeMode = null;
      state.themeColor = null;
    },
  },
});

export const { actionSetUsePreferences, actionUnsetUserPreferences } =
  userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
