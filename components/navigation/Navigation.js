import classes from './Navigation.module.css';
import Link from 'next/link';
import { Fragment } from 'react'
import { Button } from '@nextui-org/react'
import { Lock } from 'react-iconly'
import { useRouter } from 'next/router'

const Navigation = () => {
  const router = useRouter()

  const handlerSignOutClick = () => {
    localStorage.removeItem('token');
    router.push('/login')
  }

  return (
    <Fragment>
      <div className={classes.image}>
        <img src="https://res.cloudinary.com/dvuqazqqs/image/upload/v1644473486/ICON11_pzxxoj.png" alt=""/>
      </div>
      <div className={classes.nav}>
        <ul>
          <li>
            <Link href={'/product'}>Product</Link>
          </li>
          <li>
            <Link href={'/order'}>Order</Link>
          </li>
        </ul>
      </div>
      <div>
        <Button onClick={handlerSignOutClick} className={classes.signOut} color={"black"} auto><Lock set="bold" primaryColor="white"/></Button>
        <div className={classes.copyright}>
          <p>Created by NMTung 💖</p>
        </div>
      </div>
    </Fragment>
  )
}

export default Navigation