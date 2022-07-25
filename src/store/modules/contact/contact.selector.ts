import { RootState } from "./../../index";

export const selectContacts = (state: RootState) => state.contact.contacts;
export const selectIsLoading = (state: RootState) => state.contact.isLoading;
export const selectError = (state: RootState) => state.contact.error;
export const selectFilters = (state: RootState) => state.contact.filters;
