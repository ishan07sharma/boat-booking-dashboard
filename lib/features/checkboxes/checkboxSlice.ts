import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState = { value: 0 } satisfies CounterState as CounterState

const counterSlice = createSlice({
  name: 'counter',
  initialState:0,
  reducers: {
    increment:(state)=>state+1,
    
}
});

export const { increment } = counterSlice.actions
export default counterSlice.reducer