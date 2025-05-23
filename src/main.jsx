import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import router from './Router/Router.jsx'
import { RouterProvider } from 'react-router'
import FetchProvider from './Context/FetchProvider.jsx'
import AuthProvider from './Context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <FetchProvider>
        <RouterProvider router={router} />
      </FetchProvider>
    </AuthProvider>


  </StrictMode>,
)
