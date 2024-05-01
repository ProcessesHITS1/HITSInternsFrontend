import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { store } from './store'

export const StoreProvider = (props: PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>
}
