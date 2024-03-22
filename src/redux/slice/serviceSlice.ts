import { createSlice } from "@reduxjs/toolkit";
export interface ServiceState {
    id: string;
    modalOpen: boolean;
}
const initialState: ServiceState = {
  id: "",
    modalOpen: false,
};
const ServiceState = createSlice({
  name: "service",
  initialState,
  reducers: {
      setIsOpen: (state, action) => {
          state.modalOpen = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
},
  },
});
export const { setIsOpen, setId } = ServiceState.actions;
export default ServiceState.reducer;