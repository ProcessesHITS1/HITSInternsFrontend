import './styles/index.scss'
import { ApplicationRouter } from '~app/routes'
import { Toaster } from './toaster'

function App() {
  return (
    <>
      <Toaster />
      <ApplicationRouter />
    </>
  )
}

export default App
