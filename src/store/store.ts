import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./reducer";

export default configureStore({
  reducer: { language: languageReducer },
});
