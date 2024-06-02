import { ReactNode } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { AppRoutes } from '~shared/config'
import { useAppSelector, selectIsAuth } from '~shared/lib/store'

export const PublicRoute = ({ elem }: { elem: ReactNode }) => {
  const isAuth = useAppSelector(selectIsAuth)

  return isAuth ? <Navigate to={AppRoutes.MENU} /> : elem
}

export const PublicRoutesWrapper = (routes: RouteObject[]) =>
  routes.map((route) => ({
    ...route,
    element: <PublicRoute elem={route.element} />,
  }))
