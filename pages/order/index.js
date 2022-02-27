import MainLayout from '../../components/layout/MainLayout'
import Order from '../../components/order/Order'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

const OrderPage = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [])

  return (
    <Fragment>
      <MainLayout>
        <Order/>
      </MainLayout>
    </Fragment>
  )
}

export default OrderPage