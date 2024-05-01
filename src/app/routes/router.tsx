import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NotFoundPage, ErrorPage } from '~pages'
import { Layout } from './layout'
import { privateList } from './private'
import { publicList } from './public'

export const ApplicationRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: privateList,
    },
    {
      path: '/',
      errorElement: <ErrorPage />,
      children: [...publicList, { path: '*', element: <NotFoundPage /> }],
    },
  ])
  return <RouterProvider router={router} />
}
