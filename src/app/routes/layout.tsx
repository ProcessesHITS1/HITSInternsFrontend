import { Outlet } from 'react-router-dom'
import { Navbar } from '~widgets/navbar'

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main className=''>
        <Outlet />
      </main>
    </>
  )
}
