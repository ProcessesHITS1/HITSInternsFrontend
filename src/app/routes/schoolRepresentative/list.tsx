import { RouteObject } from 'react-router-dom'
import { GroupsPage, UsersListPage, CompaniesPage } from '~pages'
import { AppRoutes } from '~shared/config'
import { SchoolRepresentativeRoutesWrapper } from './schoolRepresentativeRoute'

const _schoolRepresentativeRoutes: RouteObject[] = [
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
]

export const schoolRepresentativeList = SchoolRepresentativeRoutesWrapper(
  _schoolRepresentativeRoutes
)
