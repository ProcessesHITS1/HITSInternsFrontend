import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { JWT_LS_KEYNAME } from '~shared/config'

import type { AuthState } from './model'
import { parseJwt } from './parseJwt'

const emptyState: AuthState = {
  jwt: undefined,
  isAuth: false,
  isAdmin: undefined,
  isManager: undefined,
  isStudent: undefined,
}

const getCachedAuthState = (): AuthState | undefined => {
  const cachedJwt = localStorage.getItem(JWT_LS_KEYNAME)
  return cachedJwt ? parseJwt(cachedJwt) : undefined
}

const initialState: AuthState = getCachedAuthState() ?? emptyState

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (_state, { payload: { jwt } }: PayloadAction<{ jwt: string }>) => {
      return parseJwt(jwt)
    },
    unsetAuthToken: () => {
      return emptyState
    },
  },
})

export const { setAuthToken, unsetAuthToken } = authSlice.actions
