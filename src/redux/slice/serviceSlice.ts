import { createSlice } from "@reduxjs/toolkit";
export interface ServiceState {
    modalOpen: boolean;
}
const initialState: ServiceState = {
    modalOpen: false,
};
const ServiceState = createSlice({
  name: "service",
  initialState,
  reducers: {
      setIsOpen: (state, action) => {
          state.modalOpen = action.payload;
    },
  },
});
export const { setIsOpen } = ServiceState.actions;
export default ServiceState.reducer;