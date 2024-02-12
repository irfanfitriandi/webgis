// import { PrivateRoutes } from '@/components'
import { Layout } from '@/components'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

/* eslint-disable */
const HomePage = lazy(() => import('@/pages'))
/* eslint-enable */

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-5xl">Not Found</h1>
      </div>
    ),
  },
])

export default routes
