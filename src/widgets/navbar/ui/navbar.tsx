import { Link } from 'react-router-dom'
import Avatar from '~assets/avatar.jpg'
import Logo from '~assets/logo.png'
import { AppRoutes } from '~shared/config'
import styles from './index.module.scss'

export const Navbar = () => {
  return (
    <header className={styles['navbar']}>
      <Link to={AppRoutes.MAIN} className={styles['logo-link']}>
        <img src={Logo} className={styles['logo']} />
        <span className={styles['logo-text']}>Стажировки</span>
      </Link>
      <Link to={AppRoutes.INTERVIEWS}>Собеседования</Link>
      <Link to={AppRoutes.PRACTICE}>Практика</Link>
      <Link to={AppRoutes.PROFILE} className={styles['avatar-container']}>
        <img src={Avatar} className={styles['avatar']} />
      </Link>
    </header>
  )
}
