import { AuthState } from './model'

export const parseJwt = (jwt: string): AuthState => {
  try {
    return {
      jwt,
      isAuth: true,
    }
  } catch (err) {
    return {
      jwt: undefined,
      isAuth: false,
    }
  }
}
