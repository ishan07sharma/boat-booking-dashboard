import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface choices {
    amenity: string[],
    safety: string[],
    meal:string,

  }
  const initialState: choices = {
    amenity:[],
    safety:[],
    meal:"",
  }

  const choicesSlice = createSlice({
    name: 'choices',
    initialState,
    reducers: {
      
      userChoices:(state, action: PayloadAction<choices>)=> {
        state.amenity=(action.payload.amenity),
        state.safety=(action.payload.safety),
        state.meal=(action.payload.meal)
    }
    },
  })
  
  export const {userChoices } = choicesSlice.actions
  export default choicesSlice.reducer