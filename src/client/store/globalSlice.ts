import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance1, instance2 } from '../utils/axios'

import routes from '../routers'

export const postSignin:any = createAsyncThunk('postSignin', async(user, thunkAPI) => {
  const res = await instance2.post('/user/signin', user)
  return res.data
})
export const postSignout:any = createAsyncThunk('postSignout', async(thunkAPI) => {
  const res = await instance2.post('/user/signout')
  return res.data
})
export const getUserInfo:any = createAsyncThunk('getUserInfo', async(token, thunkAPI) => {
  const res = await instance2.get(`/user/info/${token}`)
  return res.data
})

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    token: '',
    userInfo: {},
    loading: false,
    auth: false,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    checkAuth(state, action) {
      // state.auth = true
      // const path = action.payload
      // const token = localStorage.token?.id
      // for(const route of routes) {
      //   if (route.path === path) {
      //     state.auth = !!route.meta?.auth && !!token
      //   }
      //   if (route.children) {
      //     this.checkAuth(route.children, path)
      //   }
      // }
      // state.auth = false
    }
  },
  extraReducers(builder) {
    builder.addCase(postSignin.fulfilled, (state, action) => {
      let token = action.payload?.data?.token
      if (token) {
        token = token.replace('Bearer ', '')
        state.token = token
        localStorage.token = token
      }
    })
    builder.addCase(postSignout.fulfilled, (state, action) => {
      let token = ''
      state.token = token
      localStorage.token = token
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      let token = action.payload?.data?.token
      if (token) {
        token = token.replace('Bearer ', '')
        state.token = token
        localStorage.token = token
        const userInfo:any = JSON.parse(atob(token.split('.')[1]))
        state.userInfo = {
          id: userInfo.id,
          username: userInfo.username,
          level: userInfo.level,
        }
      }
    })
  }
})

export const { checkAuth } = globalSlice.actions
export default globalSlice.reducer