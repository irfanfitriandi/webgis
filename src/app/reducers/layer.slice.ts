import { createSlice } from '@reduxjs/toolkit'

interface IState {
  point: boolean
  polygon: boolean
}
const initialState: IState = {
  point: false,
  polygon: false,
}

const layerSlice = createSlice({
  name: 'layer',
  initialState,
  reducers: {
    setPoint: (state, action) => {
      state.point = action.payload
    },
    setPolygon: (state, action) => {
      state.polygon = action.payload
    },
  },
})

export const { setPoint, setPolygon } = layerSlice.actions

export default layerSlice.reducer
