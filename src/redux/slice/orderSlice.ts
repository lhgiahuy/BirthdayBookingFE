import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export interface orderSlice {
  order: {
    place: {
      id: string;
      price: number;
    };
    selectedServices: {
      serviceId: string;
      quantity: number;
      price: number;
    }[];
    menuPrice: number;
    decoration: {
      id: string;
      price: number;
    };
    totalPrice: number;
    date: string;
    note: string;
    hostId: string;
    guestId: string;
  };
}

const initialState: orderSlice = {
  order: {
    place: { id: "", price: 0 },
    menuPrice: 0,
    selectedServices: [],
    decoration: { id: "", price: 0 },
    totalPrice: 0,
    date: dayjs().add(2, "day").toISOString(),
    note: "",
    hostId: "",
    guestId: "",
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setPlace: (
      state,
      action: PayloadAction<{ placeId: string; price: number }>
    ) => {
      state.order.place = {
        id: action.payload.placeId,
        price: action.payload.price,
      };
    },
    addDish: (
      state,
      action: PayloadAction<{
        serviceId: string;
        quantity: number;
        price: number;
      }>
    ) => {
      const { serviceId, quantity, price } = action.payload;
      const existingServiceIndex = state.order.selectedServices.findIndex(
        (service) => service.serviceId === serviceId
      );
      if (existingServiceIndex !== -1) {
        // Service already exists, update its quantity
        state.order.selectedServices[existingServiceIndex].quantity += quantity;
      } else {
        // Service doesn't exist, add it to the array
        state.order.selectedServices.push({ serviceId, quantity, price });
      }
    },
    addDecoration: (
      state,
      action: PayloadAction<{ decorationId: string; price: number }>
    ) => {
      state.order.decoration = {
        id: action.payload.decorationId,
        price: action.payload.price,
      };
    },
    removeService: (state, action: PayloadAction<string>) => {
      // Find the service with the provided serviceId
      const serviceToRemove = state.order.selectedServices.find(
        (service) => service.serviceId === action.payload
      );
      if (serviceToRemove) {
        // If the service exists, decrement its quantity
        serviceToRemove.quantity--;
        // If the quantity becomes zero, remove the service from the array
        if (serviceToRemove.quantity === 0) {
          state.order.selectedServices = state.order.selectedServices.filter(
            (service) => service.serviceId !== action.payload
          );
        }
      }
    },
    getTotalPrice: (state) => {
      const placePrice = state.order.place.price || 0;
      const servicesPrice = state.order.selectedServices.reduce(
        (total, service) => total + service.quantity * service.price,
        0
      );
      const decorationPrice = state.order.decoration.price || 0;
      state.order.totalPrice = placePrice + servicesPrice + decorationPrice;
    },

    getMenuPrice: (state) => {
      const servicesPrice = state.order.selectedServices.reduce(
        (total, service) => total + service.quantity * service.price,
        0
      );
      state.order.menuPrice = servicesPrice;
    },

    setDate: (state, action: PayloadAction<string>) => {
      state.order.date = action.payload;
    },

    setNote: (state, action: PayloadAction<string>) => {
      state.order.note = action.payload;
    },
  },
});

export const {
  setPlace,
  addDish,
  addDecoration,
  getMenuPrice,
  removeService,
  getTotalPrice,
  setDate,
  setNote,
} = orderSlice.actions;

export default orderSlice.reducer;
