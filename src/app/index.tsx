import './styles/index.scss'
import { AntdProvider } from './antdesign'
import { ApplicationRouter } from './routes'
import { StoreProvider } from './store'
import { Toaster } from './toaster'

const App = () => (
  <AntdProvider>
    <Toaster />
    <ApplicationRouter />
  </AntdProvider>
)

const WrappedApp = () => (
  <StoreProvider>
    <App />
  </StoreProvider>
)

export default WrappedApp
