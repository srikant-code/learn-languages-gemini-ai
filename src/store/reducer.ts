import { createSlice } from "@reduxjs/toolkit";
import { STRINGS } from "../utilities/constants";

export const languageSlice = createSlice({
  name: "language",
  initialState: localStorage.getItem(STRINGS.STORAGE.SETTINGS)
    ? JSON.parse(localStorage.getItem(STRINGS.STORAGE.SETTINGS))
    : {
        theme: "",
        language: { label: "English", value: "en" },
        apiKey: "",
        geminiModel: STRINGS.MODELS.FLASH_1_5,
      },
  reducers: {
    changeTheme: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.theme = action.payload;
    },
    setSetting: (state, action) => {
      state[action.payload.key] = action.payload.value;
      localStorage.setItem(STRINGS.STORAGE.SETTINGS, JSON.stringify(state));
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTheme, setSetting } = languageSlice.actions;

export default languageSlice.reducer;
