import { createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../api/user'

export const Status = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
  Failure: 'failure'
}

const initialState = {
  users: [],
  index: 0,
  status: Status.Idle,
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    resetUsers(state) {
      state.users = initialState.users
      state.index = initialState.index
      state.status = initialState.status
      state.error = initialState.error
    },
    getUsersStart(state, action) {
      if (action.payload === 0) {
        state.users = []
      }

      state.error = null
      state.status = Status.Loading
    },
    getUsersSuccess(state, action) {
      const { data, index } = action.payload
      const nextUsers = [...new Set(state.users.concat(data))]
      state.users = nextUsers
      state.index = index
      state.status = Status.Success
    },
    getUsersFailure(state, action) {
      state.error = action.payload
    }
  }
})

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  resetUsers
} = usersSlice.actions

export default usersSlice.reducer

export const selectUsers = state => ({
  users: state.users.users,
  index: state.users.index,
  status: state.users.status,
  error: state.users.error,
})


export const fetchUsers = (index = 0) => async dispatch => {
  try {
    dispatch(getUsersStart(index))
    const {data} = await getUsers(index)
    dispatch(getUsersSuccess({ ...data, index }))
  } catch (error) {
    dispatch(getUsersFailure(error))
  }
}
