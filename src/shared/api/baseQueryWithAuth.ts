import { FetchArgs, FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { BaseQueryApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { AppRoutes, JWT_LS_KEYNAME } from '~shared/config'

export const baseQueryWithAuth = (args: FetchBaseQueryArgs) => {
  const baseQuery = fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.jwt

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
    ...args,
  })

  // eslint-disable-next-line @typescript-eslint/ban-types
  return async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    const query = await baseQuery(args, api, extraOptions)

    if (query.error?.status === 401) {
      localStorage.removeItem(JWT_LS_KEYNAME)
      document.location = AppRoutes.LOGIN
    }

    return query
  }
}
