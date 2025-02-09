import { combineReducers } from "@reduxjs/toolkit";
import dataSlice from "./repositoriesSlice";

const createReducer = combineReducers({
  dataSlice,
});

export default createReducer;
