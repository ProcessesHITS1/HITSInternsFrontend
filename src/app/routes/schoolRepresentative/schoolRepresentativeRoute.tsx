import { Button } from 'antd'
import { ReactNode } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import { Role, useGetMyInfoQuery } from '~entities/user'
import { AppRoutes, JWT_LS_KEYNAME } from '~shared/config'
import { selectIsAuth, useAppSelector } from '~shared/lib/store'

export const SchoolRepresentativeRoute = ({ elem }: { elem: ReactNode }) => {
  const isAuth = useAppSelector(selectIsAuth)
  const infoQuery = useGetMyInfoQuery(undefined, {
    skip: !isAuth,
  })

  if (!isAuth) {
    return <Navigate to={AppRoutes.LOGIN} />
  }

  if (infoQuery.isLoading) {
    return null
  }

  if (infoQuery.isError) {
    return (
      <>
        <div>Произошла ошибка при получении прав доступа</div>
        <Button
          onClick={() => {
            localStorage.removeItem(JWT_LS_KEYNAME)
            location.reload()
          }}
        >
          Выход
        </Button>
      </>
    )
  }

  const hasAccess = infoQuery.data?.roles.some(
    (role) => role === Role.ROLE_SCHOOL_REPRESENTATIVE || role === Role.ROLE_ADMIN
  )

  return hasAccess ? elem : <Navigate to={AppRoutes.PROFILE} />
}

export const SchoolRepresentativeRoutesWrapper = (routes: RouteObject[]) =>
  routes.map((route) => ({
    ...route,
    element: <SchoolRepresentativeRoute elem={route.element} />,
  }))
