import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import globalReducer from './globalSlice'
import counterReducer from './counterSlice'
import categoryReducer from './categorySlice'
import orderReducer from './orderSlice'

export const store = configureStore({
  reducer: {
    global: globalReducer,
    counter: counterReducer,
    order: orderReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger)
})