import { createSlice } from '@reduxjs/toolkit'

const historySlice = createSlice({
  name: 'history',
  initialState: {
    action: null,
  },
  reducers: {
    setAction(state, action) {
      state.action = action.payload
    }
  }
})

export const {
  setAction
} = historySlice.actions

export default historySlice.reducer

export const selectHistory = state => ({
  action: state.history.action
})