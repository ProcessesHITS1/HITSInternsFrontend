import { RouteObject } from 'react-router-dom'
import { GroupsPage } from '~pages'
import { AppRoutes } from '~shared/config'
import { SchoolRepresentativeRoutesWrapper } from './schoolRepresentativeRoute'

const _schoolRepresentativeRoutes: RouteObject[] = [
  {
    path: AppRoutes.GROUPS,
    element: <GroupsPage />,
  },
]

export const schoolRepresentativeList = SchoolRepresentativeRoutesWrapper(
  _schoolRepresentativeRoutes
)
