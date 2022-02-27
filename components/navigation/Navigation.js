import classes from './Navigation.module.css';
import Link from 'next/link';

const Navigation = () => {
  return (
    <div>
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
      <div className={classes.copyright}>
        <p>Created by NMTung & team&apos;s project 💖</p>
      </div>
    </div>
  )
}

export default Navigation