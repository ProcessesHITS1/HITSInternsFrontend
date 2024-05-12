import { authApi, companyApi, interviewsApi } from '~shared/api'

export const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [interviewsApi.reducerPath]: interviewsApi.reducer,
}

export const apiMiddleware = [authApi.middleware]
