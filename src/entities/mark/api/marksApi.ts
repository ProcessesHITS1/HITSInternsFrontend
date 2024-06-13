import { thirdCourseApi } from '~shared/api'
import {
  GetMarksResp,
  GetMarksReq,
  GetRequirementsResp,
  GetRequirementsReq,
} from './types'

const endpoints = thirdCourseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarks: builder.query<GetMarksResp, GetMarksReq>({
      query: ({ studentInSemesterId }) =>
        `marks/student-in-semester/${studentInSemesterId}`,
      providesTags: [],
    }),
    getRequirements: builder.query<GetRequirementsResp, GetRequirementsReq>({
      query: () => '/mark-requirements',
      providesTags: ['requirementsList'],
      transformResponse: (resp, _meta, arg) => {
        return (resp as GetRequirementsResp).filter(
          (v) => v.semesterId === arg.semesterId
        )
      },
    }),
  }),
})

export const { useLazyGetMarksQuery, useGetRequirementsQuery } = endpoints
