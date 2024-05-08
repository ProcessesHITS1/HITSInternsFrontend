import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NotFoundPage, ErrorPage } from '~pages'
import { Layout } from './layout'
import { privateList } from './private'
import { publicList } from './public'

export const ApplicationRouter = () => {
  const router = createBrowserRouter([
    {
      errorElement: <ErrorPage />,
      children: publicList,
    },
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: privateList,
    },
    { path: '*', element: <NotFoundPage /> },
  ])
  return <RouterProvider router={router} />
}
