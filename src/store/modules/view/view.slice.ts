import { RootState } from "./../../index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateTable } from "../../../constans";

interface ViewState {
  view: string | null;
}
const initialState: ViewState = {
  view: localStorage.getItem("view")
    ? localStorage.getItem("view")
    : StateTable.TABLE,
};

const viewSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setView(state: ViewState, action: PayloadAction<string>) {
      state.view = action.payload;
      localStorage.setItem("view", action.payload);
    },
  },
});

export const selectView = (state: RootState) => state.view.view;

export default viewSlice.reducer;
export const { setView } = viewSlice.actions;
