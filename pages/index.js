import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Home() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/product')
    } else {
      router.push('/login')
    }
  }, [])

  return <div></div>
}

export default Home