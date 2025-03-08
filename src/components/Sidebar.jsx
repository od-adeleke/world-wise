import { Outlet } from "react-router-dom";
import Logo from './Logo'
import AppNav from './AppNav'
import SidebarFooter from './SidebarFooter'
import styles from './Sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />
      <SidebarFooter />
    </div>
  )
}

export default Sidebar
