import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/checkboxes/checkboxSlice'
import choicesSlice from './features/choices/choicesSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        counter:counterSlice,
        choices:choicesSlice
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']