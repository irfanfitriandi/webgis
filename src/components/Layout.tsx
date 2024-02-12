import { Sidebar } from '.'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <main className="flex">
      <Sidebar />
      <Outlet />
    </main>
  )
}
