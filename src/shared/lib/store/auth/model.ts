export type AuthState = {
  isAuth: boolean
  jwt: string | undefined
}

export type JWT_PAYLOAD = {
  nbf: number
  exp: number
  iat: number
  iss: string
  aud: string
}
