import classes from './Contain.module.css'

const Contain = ({children}) => {
  return (
    <div className={classes.main}>
      {children}
    </div>
  )
}

export default Contain