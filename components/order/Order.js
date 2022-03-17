import classes from './Order.module.css'
import { Button, Spacer } from '@nextui-org/react'
import ColOrder from '../colOrder/ColOrder'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      params: {
        status: 0,
      },
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
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      params: {
        status: 1,
      },
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
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      params: {
        status: 2,
      },
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

  const handleClickToConfirmed = () => {
    toast.info(`Updating id ${selectedDelivering.join(', ')} ...`)
    axios.post('/api/order/change', {
      ids: selectedDelivering,
      status: 0,
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(res => {
        if (res.status === 200) {
          getOrderHistoryConfirmed()
          getOrderHistoryDelivering()
          toast.success('Update successfully!')
        }
      })
      .catch(err => {
        console.log(err)
        toast.error('Update failed!')
      })
  }

  const handleClickToDelivered = () => {
    toast.info(`Updating id ${selectedDelivering.join(', ')} ...`)
    axios.post('/api/order/change', {
      ids: selectedDelivering,
      status: 2,
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(res => {
        if (res.status === 200) {
          getOrderHistoryDelivering()
          getOrderHistoryDelivered()
          toast.success('Update successfully!')
        }
      })
      .catch(err => {
        console.log(err)
        toast.error('Update failed!')
      })
  }

  const handleClickToDelivering = () => {
    let data = {}
    if (selectedConfirmed.length !== 0) {
      toast.info(`Updating id ${selectedConfirmed.join(', ')} ...`)
      data = {
        ids: selectedConfirmed,
        status: 1,
      }
    }
    if (selectedDelivered.length !== 0) {
      toast.info(`Updating id ${selectedDelivered.join(', ')} ...`)
      data = {
        ids: selectedDelivered,
        status: 1,
      }
    }

    axios.post('/api/order/change', data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(res => {
        if (res.status === 200) {
          if (selectedConfirmed.length !== 0) {
            getOrderHistoryConfirmed()
            getOrderHistoryDelivering()
          } else {
            getOrderHistoryDelivered()
            getOrderHistoryDelivering()
          }
          toast.success('Update successfully!')
        }
      })
      .catch(err => {
        console.log(err)
        toast.error('Update failed!')
      })
  }

  return (
    <div className={classes.main}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={classes.col}>
        <ColOrder
          setSelectedProduct={handleChangeSelectConfirmed}
          selectionModel={selectedConfirmed}
          dataTable={listConfirmed}
          title={'Confirmed'}/>
      </div>
      <div>
        <Button onClick={handleClickToDelivering} disabled={selectedConfirmed.length === 0} color="success" auto>
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/arrow.png"/>
        </Button>
        <Spacer y={0.5}/>
        <Button onClick={handleClickToConfirmed} disabled={selectedDelivering.length === 0} color="success" auto>
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
        <Button onClick={handleClickToDelivered} disabled={selectedDelivering.length === 0} color="success" auto>
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/arrow.png"/>
        </Button>
        <Spacer y={0.5}/>
        <Button onClick={handleClickToDelivering} disabled={selectedDelivered.length === 0} color="success" auto>
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