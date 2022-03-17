import classes from './Order.module.css'
import { Button, Spacer } from '@nextui-org/react'
import ColOrder from '../colOrder/ColOrder'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Order = () => {
  const [listConfirmed, setListConfirmed] = useState([])
  const [listDelivering, setListDelivering] = useState([])
  const [listDelivered, setListDelivered] = useState([])

  const [selectedConfirmed, setSelectedConfirmed] = useState([])
  const [selectedDelivering, setSelectedDelivering] = useState([])
  const [selectedDelivered, setSelectedDelivered] = useState([])

  useEffect(() => {
    getOrderHistoryConfirmed()
    getOrderHistoryDelivered()
    getOrderHistoryDelivering()
  }, [])

  const getOrderHistoryConfirmed = () => {
    axios.get('/api/order', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params:{
        status: 0
      }
    })
      .then(res => {
        setListConfirmed(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getOrderHistoryDelivering = () => {
    axios.get('/api/order', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params:{
        status: 1
      }
    })
      .then(res => {
        setListDelivering(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getOrderHistoryDelivered = () => {
    axios.get('/api/order', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params:{
        status: 2
      }
    })
      .then(res => {
        setListDelivered(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleChangeSelectConfirmed = (e) => {
    setSelectedConfirmed(e)
    setSelectedDelivering([])
    setSelectedDelivered([])
  }

  const handleChangeSelectDelivering = (e) => {
    setSelectedDelivering(e)
    setSelectedConfirmed([])
    setSelectedDelivered([])
  }

  const handleChangeSelectDelivered = (e) => {
    setSelectedDelivered(e)
    setSelectedConfirmed([])
    setSelectedDelivering([])
  }

  return (
    <div className={classes.main}>
      <div className={classes.col}>
        <ColOrder
          setSelectedProduct={handleChangeSelectConfirmed}
          selectionModel={selectedConfirmed}
          dataTable={listConfirmed}
          title={'Confirmed'}/>
      </div>
      <div>
        <Button disabled={selectedConfirmed.length === 0} color="success" auto>
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/arrow.png"/>
        </Button>
        <Spacer y={0.5}/>
        <Button disabled={selectedDelivering.length === 0} color="success" auto>
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/left.png"/>
        </Button>
      </div>
      <div className={classes.col}>
        <ColOrder
          setSelectedProduct={handleChangeSelectDelivering}
          selectionModel={selectedDelivering}
          dataTable={listDelivering}
          title={'Delivering'}/>
      </div>
      <div>
        <Button disabled={selectedDelivering.length === 0} color="success" auto>
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/arrow.png"/>
        </Button>
        <Spacer y={0.5}/>
        <Button disabled={selectedDelivered.length === 0} color="success" auto>
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/left.png"/>
        </Button>
      </div>
      <div className={classes.col}>
        <ColOrder
          setSelectedProduct={handleChangeSelectDelivered}
          selectionModel={selectedDelivered}
          dataTable={listDelivered}
          title={'Delivered'}/>
      </div>
    </div>
  )
}

export default Order