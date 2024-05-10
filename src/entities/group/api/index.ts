import { authApi } from '~shared/api'
import { GetGroupsReq, GetGroupsResp } from './model'

const endpoints = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<GetGroupsResp, GetGroupsReq>({
      query: () => ({
        url: '/student-groups',
      }),
      providesTags: ['groupList'],
    }),
  }),
})

export const { useGetGroupsQuery } = endpoints
