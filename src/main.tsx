import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.tsx'
import HomePage from './pages/HomePage.tsx'
import PortfolioDetailPage from './pages/PortfolioDetailPage.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ToastProvider } from './contexts/ToastContext.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'portfolio/:projectId',
        element: <PortfolioDetailPage />,
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
)
