import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  finalValue: null,
  IdData: null,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.finalValue += 1;
    },
    decrement: (state) => {
      state.finalValue -= 1;
    },
    incrementByAmount: (state, action) => {
      state.finalValue = action.payload;
    },
    IdData: (state, action) => {
      state.IdData = action.payload;
    },
  },
});
export const selectFinalValue = createSelector(
  (state) => state.counter.finalValue,
  (finalValue) => finalValue || []
);

export const { increment, decrement, incrementByAmount,IdData } = counterSlice.actions;


export default counterSlice.reducer;
