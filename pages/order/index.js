import MainLayout from '../../components/layout/MainLayout'
import Order from '../../components/order/Order'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

const OrderPage = () => {
  const router = useRouter()

  const [isCheck, setIsCheck] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    } else {
      setIsCheck(true)
    }
  }, [])

  return (
    <Fragment>
      {isCheck && <MainLayout>
        <Order/>
      </MainLayout>}
    </Fragment>
  )
}

export default OrderPage