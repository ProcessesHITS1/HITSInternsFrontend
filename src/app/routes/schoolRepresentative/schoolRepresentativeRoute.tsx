import { ReactNode } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import { Role, useGetMyInfoQuery } from '~entities/user'

import { AppRoutes } from '~shared/config'

export const SchoolRepresentativeRoute = ({ elem }: { elem: ReactNode }) => {
  const infoQuery = useGetMyInfoQuery()

  if (infoQuery.isFetching) {
    return null
  }

  if (infoQuery.isError) {
    return 'Произошла ошибка при получении прав доступа'
  }

  const hasAccess = infoQuery.data?.roles.some(
    (role) => role === Role.ROLE_SCHOOL_REPRESENTATIVE || Role.ROLE_ADMIN
  )

  return hasAccess ? elem : <Navigate to={AppRoutes.MAIN} />
}

export const SchoolRepresentativeRoutesWrapper = (routes: RouteObject[]) =>
  routes.map((route) => ({
    ...route,
    element: <SchoolRepresentativeRoute elem={route.element} />,
  }))
