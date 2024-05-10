import { Outlet } from 'react-router-dom'
import { Navbar } from '~widgets/navbar'

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main className='flex flex-col items-center pb-10'>
        <Outlet />
      </main>
    </>
  )
}
