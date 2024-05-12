import { Role, useGetAllUsersQuery } from '~entities/user'

export const usePersonalQuery = () => {
  const usersQuery = useGetAllUsersQuery({ page: 1, size: 10000 })
  const data = usersQuery.data?.data.filter((user) =>
    user.roles.includes(Role.ROLE_SCHOOL_REPRESENTATIVE)
  )
  return {
    ...usersQuery,
    data,
  }
}
