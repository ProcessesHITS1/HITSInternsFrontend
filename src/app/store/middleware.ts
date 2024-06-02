import { companyApi, interviewsApi, thirdCourseApi } from '~shared/api'
import { authMiddleware } from '~shared/lib/store'

export const middlewareList = [
  authMiddleware.middleware,
  companyApi.middleware,
  interviewsApi.middleware,
  thirdCourseApi.middleware,
]
