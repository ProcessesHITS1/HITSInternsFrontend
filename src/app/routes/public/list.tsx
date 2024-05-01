import { RouteObject } from 'react-router-dom'

import { LoginPage, RegisterPage } from '~pages'
import { AppRoutes } from '~shared/config'
import { PublicRoutesWrapper } from './publicRoute'

// These routes are only for unauthorized users

const _publicRoutes: RouteObject[] = [
  {
    path: AppRoutes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: AppRoutes.REGISTER,
    element: <RegisterPage />,
  },
]

export const publicList = PublicRoutesWrapper(_publicRoutes)
