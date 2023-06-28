import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance1 } from '../utils/axios'

export const getCategoryList = createAsyncThunk('categoryList', async(xx, { rejectWithValue }) => {
  const res = await instance1.get('/category/list')
  return res.data
})

export const getCategoryDetail:any = createAsyncThunk('categoryDetail', async(id, thunkAPI) => {
  const res = await instance1.get(`/category/detail/${id}`)
  return res.data
})

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    list: [],
    detail: {},
    num: 1,
  },
  reducers: {
    categoryList(state) {

    },
    categoryDetail(state, id) {

    },
    categoryNum(state, action) {
      if (action.payload === '-') {
        state.num -= 1
      } else if (action.payload === '+') {
        state.num += 1
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(getCategoryList.fulfilled, (state, action) => {
      // console.log(state)
      // console.log(action)
      // console.log(action.payload)
      state.list = action.payload.data
      // return action.payload
    })
    builder.addCase(getCategoryDetail.fulfilled, (state, action) => {
      // console.log(state.list)
      // console.log(action.payload)
      state.detail = action.payload.data
      // return action.payload
    })
  }
})

export const { categoryList, categoryDetail, categoryNum } = categorySlice.actions
export default categorySlice.reducer