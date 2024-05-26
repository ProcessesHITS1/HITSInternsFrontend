import { createApi } from '@reduxjs/toolkit/query/react'
import { API_THIRD_COURSE_URL } from '~shared/config'
import { baseQueryWithAuth } from '../baseQueryWithAuth'

export const thirdCourseApi = createApi({
  reducerPath: 'thirdCourseApi',
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithAuth({ baseUrl: API_THIRD_COURSE_URL }),
  endpoints: () => ({}),
  tagTypes: [],
})
