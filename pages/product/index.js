import MainLayout from '../../components/layout/MainLayout'
import Product from '../../components/product/Product'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

const ProductPage = () => {
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
        <Product/>
      </MainLayout>}
    </Fragment>
  )
}

export default ProductPage