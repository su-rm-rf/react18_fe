import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance1 } from '../utils/axios'

export const getOrderList:any = createAsyncThunk('orderList', async() => {
  const res = await instance1.get('/order/list')
  return res.data
})

export const getOrderDetail:any = createAsyncThunk('orderDetail', async(id, thunkAPI) => {
  const res = await instance1.get(`/order/detail/${id}`)
  return res.data
})

export const addOrder:any = createAsyncThunk('addOrder', async(params:any, thunkAPI) => {
  const res = await instance1.post(`/order/add`, {
    goods_id: params?.goods_id,
    num: params?.num,
  })
  return res.data
})

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    list: [],
    detail: {},
    add: {},
    loading: false,
  },
  reducers: {
    orderList(state) {

    },
    orderDetail(state, id) {

    },
    showLoading(state) {
      state.loading = true
    }
  },
  extraReducers(builder) {
    builder.addCase(getOrderList.fulfilled, (state, action) => {
      // console.log(state)
      // console.log(action)
      state.list = action.payload.data
      state.loading = false
      // return action.payload
    })
    builder.addCase(getOrderDetail.fulfilled, (state, action) => {
      // console.log(state.detail)
      // console.log(action.payload)
      // state.detail = action.payload
    })
    builder.addCase(addOrder.fulfilled, (state, action) => {
      // console.log(state.order)
      // console.log(action.payload)
      state.add = action.payload.data
    })
  }
})

export const { orderList, orderDetail, showLoading } = orderSlice.actions
export default orderSlice.reducer