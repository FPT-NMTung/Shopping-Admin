import Navigation from '../navigation/Navigation'

import classes from './MainLayout.module.css'

const MainLayout = ({children}) => {
  return (
    <div className={classes.main}>
      <div className={classes.left}><Navigation/></div>
      <div className={classes.right}>{children}</div>
    </div>
  )
}

export default MainLayout