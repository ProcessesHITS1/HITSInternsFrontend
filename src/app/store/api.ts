import { authApi, companyApi, interviewsApi, thirdCourseApi } from '~shared/api'

export const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [interviewsApi.reducerPath]: interviewsApi.reducer,
  [thirdCourseApi.reducerPath]: thirdCourseApi.reducer,
}

export const apiMiddleware = [authApi.middleware]
