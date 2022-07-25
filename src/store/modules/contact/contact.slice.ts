import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ContactApi from "../../../services/contact.api";
import { FiltersTypes, IContact } from "./contact.types";

export const getContacts = createAsyncThunk(
  "contact/getContacts",
  async (payload: FiltersTypes) => {
    return await ContactApi.getContacts(payload);
  }
);
interface ContactState {
  contacts: IContact[];
  isLoading: boolean;
  error: string | undefined;
  filters: FiltersTypes;
}
const initialState: ContactState = {
  contacts: [],
  isLoading: true,
  error: "",
  filters: {
    nat: "",
    page: 1,
    totalCount: 5000,
    limit: 10,
    gender: "",
    name: "",
  },
};
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setPage(state: ContactState, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },
    setNat(state: ContactState, action: PayloadAction<string>) {
      state.filters.nat = action.payload;
    },
    setGender(state: ContactState, action: PayloadAction<string>) {
      state.filters.gender = action.payload;
    },
    setName(state: ContactState, action: PayloadAction<string>) {
      state.filters.name = action.payload;
    },
    setLimit(state: ContactState, action: PayloadAction<number>) {
      state.filters.limit = action.payload;
    },
    clearFilters(state: ContactState, action: PayloadAction) {
      state.filters.nat = "";
      state.filters.gender = "";
      state.filters.name = "";
      state.filters.limit = 10;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getContacts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = action.payload.data.results;
        state.isLoading = false;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      }),
});

export default contactSlice.reducer;
export const { setPage, setNat, setName, setGender, clearFilters, setLimit } =
  contactSlice.actions;
