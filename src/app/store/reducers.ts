import { authSlice } from '~shared/lib/store'

export const commonReducers = {
  [authSlice.reducerPath]: authSlice.reducer,
}
