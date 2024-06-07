import { authApi, chatsApi, companyApi, interviewsApi, thirdCourseApi } from '~shared/api'

export const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [interviewsApi.reducerPath]: interviewsApi.reducer,
  [thirdCourseApi.reducerPath]: thirdCourseApi.reducer,
  [chatsApi.reducerPath]: chatsApi.reducer,
}

export const apiMiddleware = [authApi.middleware]
