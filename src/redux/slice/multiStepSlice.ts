import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MultiStepState {
  currentStep: number;
  userData: any[];
  finalData: any[];
}

const initialState: MultiStepState = {
  currentStep: 1,
  userData: [],
  finalData: [],
};

export const multiStepSlice = createSlice({
  name: 'multiStep',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setUserData: (state, action: PayloadAction<any[]>) => {
      state.userData = action.payload;
    },
    setFinalData: (state, action: PayloadAction<any[]>) => {
      state.finalData = action.payload;
    },
  },
});

export const { setCurrentStep, setUserData, setFinalData } = multiStepSlice.actions;

export default multiStepSlice.reducer; // để tạp vì lỗi ...
