import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { apiMiddleware, apiReducers } from './api'
import { middlewareList } from './middleware'
import { commonReducers } from './reducers'

export const store = configureStore({
  reducer: combineReducers({
    ...commonReducers,
    ...apiReducers,
  }),
  middleware: (gDM) => gDM().concat(apiMiddleware).concat(middlewareList),
})
