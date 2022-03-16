import classes from './Order.module.css'
import { Button, Spacer } from '@nextui-org/react'
import ColOrder from '../colOrder/ColOrder'



const Order = () => {
  return (
    <div className={classes.main}>
      <div className={classes.col}>
        <ColOrder title={'Confirmed'}/>
      </div>
      <div>
        <Button disabled color="success" auto>
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/arrow.png"/>
        </Button>
        <Spacer y={0.5}/>
        <Button disabled color="warning" auto>
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/left.png"/>
        </Button>
      </div>
      <div className={classes.col}>
        <ColOrder title={'Delivering'}/>
      </div>
      <div>
        <Button disabled color="success" auto>
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/arrow.png"/>
        </Button>
        <Spacer y={0.5}/>
        <Button disabled color="warning" auto>
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/left.png"/>
        </Button>
      </div>
      <div className={classes.col}>
        <ColOrder title={'Delivered'}/>
      </div>
    </div>
  )
}

export default Order