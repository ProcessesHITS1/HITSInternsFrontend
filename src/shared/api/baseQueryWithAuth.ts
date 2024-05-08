import { FetchArgs, FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { BaseQueryApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { unsetAuthToken } from '~shared/lib/store'

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
      api.dispatch(unsetAuthToken())
    }

    return query
  }
}
