import { RouteObject } from 'react-router-dom'
import { MainPage, InterviewsPage, PracticePage, ProfilePage } from '~pages'
import { AppRoutes } from '~shared/config'
import { PrivateRoutesWrapper } from './privateRoute'

const _privateRoutes: RouteObject[] = [
  {
    path: AppRoutes.MAIN,
    element: <MainPage />,
  },
  {
    path: AppRoutes.INTERVIEWS,
    element: <InterviewsPage />,
  },
  {
    path: AppRoutes.PRACTICE,
    element: <PracticePage />,
  },
  {
    path: AppRoutes.PROFILE,
    element: <ProfilePage />,
  },
]

export const privateList = PrivateRoutesWrapper(_privateRoutes)
