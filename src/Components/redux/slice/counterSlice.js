import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   finalValue: null,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.finalValue += 1
    },
    decrement: (state) => {
      state.finalValue -= 1
    },
    incrementByAmount: (state, action) => {
      state.finalValue = action.payload
      
    },
  },
})


// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer