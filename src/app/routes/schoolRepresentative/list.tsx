import { RouteObject } from 'react-router-dom'
import {
  GroupsPage,
  UsersListPage,
  CompaniesPage,
  SeasonsPage,
  AdminPage,
  InterviewsPage,
  PracticePage,
} from '~pages'
import { AppRoutes } from '~shared/config'
import { SchoolRepresentativeRoutesWrapper } from './schoolRepresentativeRoute'

const _schoolRepresentativeRoutes: RouteObject[] = [
  {
    path: AppRoutes.ADMIN,
    element: <AdminPage />,
  },
  {
    path: AppRoutes.GROUPS,
    element: <GroupsPage />,
  },
  {
    path: AppRoutes.USERS,
    element: <UsersListPage />,
  },
  {
    path: AppRoutes.COMPANITES,
    element: <CompaniesPage />,
  },
  {
    path: AppRoutes.SEASONS,
    element: <SeasonsPage />,
  },
  {
    path: AppRoutes.INTERVIEWS,
    element: <InterviewsPage />,
  },
  {
    path: AppRoutes.PRACTICE,
    element: <PracticePage />,
  },
]

export const schoolRepresentativeList = SchoolRepresentativeRoutesWrapper(
  _schoolRepresentativeRoutes
)
