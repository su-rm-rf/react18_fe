import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance2 } from '../utils/axios'

import routes from '../routers'

export const postSignin:any = createAsyncThunk('postSignin2', async(user, thunkAPI) => {
  const res = await instance2.post('/user/signin', user)
  return res.data
})

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    token: '',
    loading: false,
    auth: false,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    checkAuth(state, action) {
      // state.auth = true
      const path = action.payload
      const token = localStorage.token?.id
      for(const route of routes) {
        if (route.path === path) {
          state.auth = !!route.meta?.auth && !!token
        }
        if (route.children) {
          this.checkAuth(route.children, path)
        }
      }
      state.auth = false
    }
  },
  extraReducers(builder) {
    builder.addCase(postSignin.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.token = action.payload.data
      }
    })
  }
})

export const { checkAuth } = globalSlice.actions
export default globalSlice.reducer