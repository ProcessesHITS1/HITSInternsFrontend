import { AuthState } from './model'

export const parseJwt = (jwt: string): AuthState => {
  try {
    return {
      jwt,
      isAuth: true,
      isAdmin: undefined,
      isManager: undefined,
      isStudent: undefined,
    }
  } catch (err) {
    return {
      jwt: undefined,
      isAuth: false,
      isAdmin: undefined,
      isManager: undefined,
      isStudent: undefined,
    }
  }
}
