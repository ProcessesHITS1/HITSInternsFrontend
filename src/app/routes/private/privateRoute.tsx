import { ReactNode } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { AppRoutes } from '~shared/config'

export const PrivateRoute = ({ elem }: { elem: ReactNode }) => {
  const isAuth = true

  return isAuth ? elem : <Navigate to={AppRoutes.LOGIN} />
}

export const PrivateRoutesWrapper = (routes: RouteObject[]) =>
  routes.map((route) => ({
    ...route,
    element: <PrivateRoute elem={route.element} />,
  }))
