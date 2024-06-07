import { jwtDecode } from 'jwt-decode'
import { AuthState } from './model'

export const parseJwt = (jwt: string): AuthState => {
  try {
    return {
      userid: jwtDecode<{ id: string }>(jwt).id || '',
      jwt,
      isAuth: true,
    }
  } catch (err) {
    return {
      userid: null,
      jwt: undefined,
      isAuth: false,
    }
  }
}
