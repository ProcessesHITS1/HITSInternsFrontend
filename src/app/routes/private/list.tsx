import { RouteObject } from 'react-router-dom'
import { MainPage } from '~pages'
import { AppRoutes } from '~shared/config'
import { PrivateRoutesWrapper } from './privateRoute'

const _privateRoutes: RouteObject[] = [
  {
    path: AppRoutes.MAIN,
    element: <MainPage />,
  },
]

export const privateList = PrivateRoutesWrapper(_privateRoutes)
