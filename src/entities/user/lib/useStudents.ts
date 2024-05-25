import { Role, useGetAllUsersQuery } from '~entities/user'

export const useStudentsQuery = () => {
  const usersQuery = useGetAllUsersQuery({ page: 1, size: 10000 })
  const data = usersQuery.data?.data.filter((user) =>
    user.roles.includes(Role.ROLE_STUDENT)
  )
  return {
    ...usersQuery,
    data,
  }
}
