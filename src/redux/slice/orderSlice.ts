import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface orderSlice {
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
}

const initialState: orderSlice = {
    place: { id: "", price: 0 },
    menuPrice: 0,
    selectedServices: [],
    decoration: { id: "", price: 0 },
    totalPrice: 0
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setPlace: (state, action: PayloadAction<{ placeId: string, price: number }>) => {
            state.place = { id: action.payload.placeId, price: action.payload.price };
        },
        addDish: (state, action: PayloadAction<{ serviceId: string, quantity: number, price: number }>) => {
            const { serviceId, quantity, price } = action.payload;
            const existingServiceIndex = state.selectedServices.findIndex(service => service.serviceId === serviceId);
            if (existingServiceIndex !== -1) {
                // Service already exists, update its quantity
                state.selectedServices[existingServiceIndex].quantity += quantity;
            } else {
                // Service doesn't exist, add it to the array
                state.selectedServices.push({ serviceId, quantity, price });
            }
        },
        addDecoration: (state, action: PayloadAction<{ decorationId: string, price: number }>) => {
            state.decoration = { id: action.payload.decorationId, price: action.payload.price };
        },
        removeService: (state, action: PayloadAction<string>) => {
            // Find the service with the provided serviceId
            const serviceToRemove = state.selectedServices.find(service => service.serviceId === action.payload);
            if (serviceToRemove) {
                // If the service exists, decrement its quantity
                serviceToRemove.quantity--;
                // If the quantity becomes zero, remove the service from the array
                if (serviceToRemove.quantity === 0) {
                    state.selectedServices = state.selectedServices.filter(service => service.serviceId !== action.payload);
                }
            }
        },
        getTotalPrice: (state) => {
            const placePrice = state.place.price || 0;
            const servicesPrice = state.selectedServices.reduce((total, service) => total + (service.quantity * service.price), 0);
            const decorationPrice = state.decoration.price || 0;
            state.totalPrice = placePrice + servicesPrice + decorationPrice;
        },

        getMenuPrice: (state) => {
            const servicesPrice = state.selectedServices.reduce((total, service) => total + (service.quantity * service.price), 0);
            state.menuPrice = servicesPrice
        }

  },
});

export const { setPlace, addDish, addDecoration, getMenuPrice,  removeService, getTotalPrice } = orderSlice.actions;

export default orderSlice.reducer;
