import { thirdCourseApi } from '~shared/api'
import {
  CreateMarkResp,
  CreateMarkReq,
  CreateRequirementResp,
  CreateRequirementReq,
} from './types'

const endpoints = thirdCourseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMark: builder.mutation<CreateMarkResp, CreateMarkReq>({
      query: ({ body, studentInSemesterId }) => ({
        url: `marks/student-in-semester/${studentInSemesterId}`,
        body,
        method: 'POST',
      }),
      invalidatesTags: [],
    }),
    createRequirement: builder.mutation<CreateRequirementResp, CreateRequirementReq>({
      query: (body) => ({
        url: '/mark-requirements',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['requirementsList'],
    }),
  }),
})

export const { useCreateMarkMutation, useCreateRequirementMutation } = endpoints
