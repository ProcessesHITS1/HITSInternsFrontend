import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'

import { JWT_LS_KEYNAME } from '~shared/config'
import { setAuthToken, unsetAuthToken } from './slice'

export const authMiddleware = createListenerMiddleware()

authMiddleware.startListening({
  matcher: isAnyOf(setAuthToken, unsetAuthToken),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState
    const jwt = state.auth.jwt
    if (jwt) {
      localStorage.setItem(JWT_LS_KEYNAME, jwt)
    } else {
      localStorage.removeItem(JWT_LS_KEYNAME)
    }
  },
})
