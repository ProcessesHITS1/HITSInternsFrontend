import { RouteObject } from 'react-router-dom'
import { ProfilePage } from '~pages'
import { AppRoutes } from '~shared/config'
import { PrivateRoutesWrapper } from './privateRoute'

const _privateRoutes: RouteObject[] = [
  {
    path: AppRoutes.PROFILE,
    element: <ProfilePage />,
  },
]

export const privateList = PrivateRoutesWrapper(_privateRoutes)
