import { thirdCourseApi } from '~shared/api'
import {
  CreateMarkResp,
  CreateMarkReq,
  CreateRequirementResp,
  CreateRequirementReq,
  EditMarkResp,
  EditMarkReq,
} from './types'

const endpoints = thirdCourseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMark: builder.mutation<CreateMarkResp, CreateMarkReq>({
      query: ({ body, studentInSemesterId }) => ({
        url: `marks/student-in-semester/${studentInSemesterId}`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['marks'],
    }),
    editMark: builder.mutation<EditMarkResp, EditMarkReq>({
      query: ({ id, value }) => ({
        url: `marks/${id}`,
        body: { value },
        method: 'PUT',
      }),
      invalidatesTags: ['marks'],
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

export const {
  useCreateMarkMutation,
  useCreateRequirementMutation,
  useEditMarkMutation,
} = endpoints
