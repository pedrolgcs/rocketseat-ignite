import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './app'
import { enableMSW } from './lib/msw'

enableMSW().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
