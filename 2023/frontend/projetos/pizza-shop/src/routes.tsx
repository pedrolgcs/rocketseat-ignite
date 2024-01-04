import { createBrowserRouter } from 'react-router-dom'

import { AppLayout, AuthLayout } from './pages/_layouts'
import { NotFoundPage } from './pages/404'
import { DashboardPage } from './pages/app/dashboard/dashboard'
import { OrdersPage } from './pages/app/orders/orders'
import { SignInPage } from './pages/auth/sign-in'
import { SignUpPage } from './pages/auth/sign-up'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/orders',
        element: <OrdersPage />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
