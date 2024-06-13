import { createApi } from '@reduxjs/toolkit/query/react'
import { API_INTERVIEWS_URL } from '~shared/config'
import { baseQueryWithAuth } from '../baseQueryWithAuth'

export const interviewsApi = createApi({
  reducerPath: 'interviewsApi',
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithAuth({ baseUrl: API_INTERVIEWS_URL }),
  endpoints: () => ({}),
  tagTypes: [
    'seasonsList',
    'season',
    'seasonInfo',
    'companiesInSeasonList',
    'studentsInSeasonList',
    'positionsList',
  ],
})
