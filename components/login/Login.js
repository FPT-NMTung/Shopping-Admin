import classes from './Login.module.css'
import { Button, Input, Loading, Spacer } from '@nextui-org/react'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [validUsername, setValidUsername] = useState(true)
  const [validPassword, setValidPassword] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleInputUsername = (e) => {
    setUsername(e.target.value)
    setValidUsername(true)
  }

  const handleInputPassword = (e) => {
    setPassword(e.target.value)
    setValidPassword(true)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (username.trim() === '' || password.trim() === '') {
      if (username.trim() === '') {
        setValidUsername(false)
      }
      if (password.trim() === '') {
        setValidPassword(false)
      }
    } else {
      setIsLoading(true)
      axios.post('/api/admin/login', {
        username,
        password,
      })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('token', response.data.token)
            router.push('/')
          } else {
            setValidUsername(false)
            setValidPassword(false)
            setIsLoading(false)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div className={classes.main}>
      <img className={classes.image}
           src="https://res.cloudinary.com/dvuqazqqs/image/upload/v1644473486/ICON11_pzxxoj.png" alt=""/>
      <form onSubmit={handleFormSubmit}>
        <Spacer y={2}/>
        <Input onChange={handleInputUsername} status={validUsername ? 'default' : 'error'} width={220} clearable labelPlaceholder="Username"/>
        <Spacer y={1.5}/>
        <Input.Password onChange={handleInputPassword} status={validPassword ? 'default' : 'error'} width={220} clearable labelPlaceholder="Password"/>
        <Spacer y={1.5}/>
        <Button disabled={isLoading} auto color={'black'} className={classes.button}>
          {isLoading && <Loading className={classes.buttonText} color="white" size="sm"/>}
          <p>Login</p>
        </Button>
      </form>
    </div>
  )
}

export default Login