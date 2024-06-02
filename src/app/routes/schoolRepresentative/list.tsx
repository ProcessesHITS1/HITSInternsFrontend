import { RouteObject } from 'react-router-dom'
import {
  AdminPage,
  CompaniesPage,
  GroupsPage,
  PracticePage,
  SeasonPage,
  SeasonsPage,
  SemesterPage,
  UsersListPage,
} from '~pages'
import { AppRoutes } from '~shared/config'
import { SchoolRepresentativeRoutesWrapper } from './schoolRepresentativeRoute'

const _schoolRepresentativeRoutes: RouteObject[] = [
  {
    path: AppRoutes.MENU,
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
    path: AppRoutes.SEASON,
    element: <SeasonPage />,
  },
  {
    path: AppRoutes.SEMESTERS,
    element: <PracticePage />,
  },
  {
    path: AppRoutes.SEMESTER,
    element: <SemesterPage />,
  },
]

export const schoolRepresentativeList = SchoolRepresentativeRoutesWrapper(
  _schoolRepresentativeRoutes
)
