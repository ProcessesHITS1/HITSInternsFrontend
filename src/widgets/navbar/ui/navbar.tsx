import { Link } from 'react-router-dom'
import Avatar from '~assets/avatar.jpg'
import Logo from '~assets/logo.png'
import { Role, useGetMyInfoQuery } from '~entities/user'
import { AppRoutes } from '~shared/config'
import { selectIsAuth, useAppSelector } from '~shared/lib/store'
import styles from './index.module.scss'

export const Navbar = () => {
  const isAuth = useAppSelector(selectIsAuth)
  const profileQuery = useGetMyInfoQuery(undefined, {
    skip: !isAuth,
  })

  if (profileQuery.isLoading || profileQuery.isError) {
    return null
  }

  const isManagerOrAdmin = profileQuery.data?.roles.some((role) =>
    [Role.ROLE_ADMIN, Role.ROLE_SCHOOL_REPRESENTATIVE].includes(role)
  )

  return (
    <header className={styles['navbar']}>
      <Link to={AppRoutes.ADMIN} className={styles['logo-link']}>
        <img src={Logo} className={styles['logo']} />
        <span className={styles['logo-text']}>Стажировки</span>
      </Link>
      {isManagerOrAdmin && <Link to={AppRoutes.ADMIN}>Админка</Link>}
      {isManagerOrAdmin && <Link to={AppRoutes.INTERVIEWS}>Собесы</Link>}
      {isManagerOrAdmin && <Link to={AppRoutes.PRACTICE}>Практика</Link>}
      <Link to={AppRoutes.PROFILE} className={styles['avatar-container']}>
        <img src={Avatar} className={styles['avatar']} />
      </Link>
    </header>
  )
}
