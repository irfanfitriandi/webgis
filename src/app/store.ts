import { configureStore } from '@reduxjs/toolkit'
import layerReducer from './reducers/layer.slice'

const store = configureStore({
  reducer: {
    layer: layerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
