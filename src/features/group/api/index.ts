import { authApi } from '~shared/api'
import { CreateGroupResp, CreateGroupReq } from './model'

const endpoints = authApi.injectEndpoints({
  endpoints: (builder) => ({
    addGroup: builder.mutation<CreateGroupResp, CreateGroupReq>({
      query: (body) => ({
        url: '/student-groups',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['groupList'],
    }),
  }),
})

export const { useAddGroupMutation } = endpoints
