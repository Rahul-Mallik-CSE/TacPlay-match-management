/** @format */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ArenaField } from "@/redux/features/settings/settingsAPI";

export type SettingsState = {
  arenaField: ArenaField | null;
};

const initialState: SettingsState = {
  arenaField: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setArenaField: (state, action: PayloadAction<ArenaField | null>) => {
      state.arenaField = action.payload;
    },
    clearArenaField: (state) => {
      state.arenaField = null;
    },
  },
});

export const { setArenaField, clearArenaField } = settingsSlice.actions;

export default settingsSlice.reducer;
