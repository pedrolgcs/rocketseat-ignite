import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFoundPage } from './pages/404'
import { DashboardPage } from './pages/app/dashboard/dashboard'
import { OrdersPage } from './pages/app/orders/orders'
import { SignInPage } from './pages/auth/sign-in'
import { SignUpPage } from './pages/auth/sign-up'
import { ErrorPage } from './pages/error'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
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
