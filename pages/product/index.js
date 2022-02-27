import MainLayout from '../../components/layout/MainLayout'
import Product from '../../components/product/Product'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'

const ProductPage = () => {
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
        <Product/>
      </MainLayout>
    </Fragment>
  )
}

export default ProductPage