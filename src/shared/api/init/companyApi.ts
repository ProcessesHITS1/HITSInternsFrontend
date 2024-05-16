import { createApi } from '@reduxjs/toolkit/query/react'
import { API_COMPANIES_URL } from '~shared/config'
import { baseQueryWithAuth } from '../baseQueryWithAuth'

export const companyApi = createApi({
  reducerPath: 'companiesApi',
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithAuth({ baseUrl: API_COMPANIES_URL }),
  endpoints: () => ({}),
  tagTypes: ['companiesList'],
})
