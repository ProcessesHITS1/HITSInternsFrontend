import './styles/index.scss'
import { ApplicationRouter } from './routes'
import { StoreProvider } from './store'
import { Toaster } from './toaster'

const App = () => (
  <>
    <Toaster />
    <ApplicationRouter />
  </>
)

const WrappedApp = () => (
  <StoreProvider>
    <App />
  </StoreProvider>
)

export default WrappedApp
