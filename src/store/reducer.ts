import { createSlice } from "@reduxjs/toolkit";
import { STRINGS } from "../utilities/constants";
import { Sleep } from "../utilities/utilities";
import { getItemFromDexie, updateItemInDexie } from "./dexie";

const dataFromDixie = await getItemFromDexie();
await Sleep(200);

export const languageSlice = createSlice({
  name: "language",
  initialState:
    // localStorage.getItem(STRINGS.STORAGE.SETTINGS)
    //   ? JSON.parse(localStorage.getItem(STRINGS.STORAGE.SETTINGS))
    dataFromDixie ?? {
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
      try {
        localStorage.setItem(STRINGS.STORAGE.SETTINGS, JSON.stringify(state));
      } catch (e) {
        console.log("cannot set to localStorage");
      }
      updateItemInDexie({
        key: action.payload.key,
        data: action.payload.value,
      });
    },
    setReduxFullStateOnLoad: (state, action) => {
      // Clear the current state
      for (const key in state) {
        delete state[key];
      }
      // Assign the new state
      Object.assign(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTheme, setSetting, setReduxFullStateOnLoad } =
  languageSlice.actions;

export default languageSlice.reducer;
