import { createSlice } from "@reduxjs/toolkit";

interface UserPreferencesInitialState {
  themeMode: string;
  themePreset: number;
}

const initialState: UserPreferencesInitialState = {
  themeMode: null,
  themePreset: null,
};

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    actionSetUserThemeMode: (state, { payload }) => {
      state.themeMode = payload;
    },
    actionSetUserThemePreset: (state, { payload }) => {
      state.themePreset = payload;
    },
    actionUnsetUserPreferences: (state) => {
      state.themeMode = null;
      state.themePreset = null;
    },
  },
});

export const {
  actionSetUserThemeMode,
  actionSetUserThemePreset,
  actionUnsetUserPreferences,
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
