export type AuthState = {
  userid: string | null
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
