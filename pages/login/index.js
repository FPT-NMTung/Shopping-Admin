import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Login from '../../components/login/Login'

const LoginPage = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/')
    }
  }, [])

  return (
    <Login/>
  )
}

export default LoginPage