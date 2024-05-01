import { ReactNode } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { AppRoutes } from '~shared/config'

export const PublicRoute = ({ elem }: { elem: ReactNode }) => {
  const isAuth = false

  return isAuth ? <Navigate to={AppRoutes.MAIN} /> : elem
}

export const PublicRoutesWrapper = (routes: RouteObject[]) =>
  routes.map((route) => ({
    ...route,
    element: <PublicRoute elem={route.element} />,
  }))
