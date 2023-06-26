import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import '@/utils/vconsole'
import App from '@/App'
import { store } from '@/store'

console.log(process.env.NODE_ENV)
console.log(process.env.BASE_ENV)

hydrateRoot(
  document.querySelector('#root') as Element,
  // <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
)