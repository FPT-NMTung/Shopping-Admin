import { Fragment, useEffect, useRef, useState } from 'react'
import classes from './NewProduct.module.css'
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import { Button, Input, Spacer } from '@nextui-org/react'
import { Slider } from '@mui/material'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const NewProduct = ({
                      onCreateSuccess,
                      isUpdate,
                      data,
                    }) => {
  const [file, setFile] = useState('')
  const [scaleImage, setScaleImage] = useState(0)
  const [loading, setLoading] = useState(false)

  const [imageBase64, setImageBase64] = useState('')

  const [validName, setValidName] = useState(true)
  const [validPrice, setValidPrice] = useState(true)
  const [validDiscount, setValidDiscount] = useState(true)
  const [validDescription, setValidDescription] = useState(true)

  const refAvatar = useRef()
  const refName = useRef()
  const refPrice = useRef()
  const refDiscount = useRef()
  const refDescription = useRef()

  useEffect(() => {
    if (isUpdate) {
      refName.current.value = data.name
      refPrice.current.value = data.price
      refDiscount.current.value = data.discount
      refDescription.current.value = data.description
    }
  }, [])

  const handleCreateProduct = () => {
    const image = refAvatar.current.getImageScaledToCanvas().toDataURL()
    const name = refName.current.value
    const price = refPrice.current.value
    const discount = refDiscount.current.value
    const description = refDescription.current.value

    if (!name || !price || !discount || !description) {
      setValidName(!!name)
      setValidPrice(!!price)
      setValidDiscount(!!discount)
      setValidDescription(!!description)
      return
    }
    toast.info(isUpdate ? 'Updating product...' : 'Creating product...')
    setLoading(true)
    let uri = ''
    let dataReq
    if (!isUpdate) {
      uri = `/api/product/create`
      dataReq = {
        image,
        name,
        price,
        discount,
        description,
      }
    } else {
      uri = `/api/product/update`
      dataReq = {
        id: data.id,
        image,
        name,
        price,
        discount,
        description,
      }
    }
    axios.post(uri, dataReq, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        setLoading(false)
        setFile('')
        setImageBase64('')
        setScaleImage(0)
        refName.current.value = ''
        refPrice.current.value = ''
        refDiscount.current.value = ''
        refDescription.current.value = ''
        onCreateSuccess()
        toast.success(isUpdate ? 'Update product success' : 'Create product success')
      })
      .catch(() => {
        toast.error(isUpdate ? 'Update product failed' : 'Create product failed')
        setLoading(false)
      })
  }

  const handleClear = () => {
    setFile('')
    setImageBase64('')
    setScaleImage(0)

    refName.current.value = ''
    refPrice.current.value = ''
    refDiscount.current.value = ''
    refDescription.current.value = ''

    setValidName(true)
    setValidPrice(true)
    setValidDiscount(true)
    setValidDescription(true)
  }

  const handleChangeZoom = (e) => {
    setScaleImage(e.target.value)
  }

  const handleDrop = (files) => {
    setFile(files[0])
  }

  return <Fragment>
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
    <h3>{isUpdate ? 'Update' : 'Create'}</h3>
    <div className={classes.createFrom}>
      <div>
        <Dropzone
          onDrop={handleDrop}
          noClick
          noKeyboard
          style={{width: '350px', height: '350px'}}
        >
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()}>
              <AvatarEditor
                ref={refAvatar}
                scale={(scaleImage + 100) / 100}
                width={350}
                height={350}
                image={file}
              />
              <input {...getInputProps()} />
              <Slider onChange={handleChangeZoom} value={scaleImage} defaultValue={0} aria-label="slider"/>
            </div>
          )}
        </Dropzone>
      </div>
      <div>
        <Input
          status={validName ? 'default' : 'error'}
          ref={refName}
          width={450}
          label={'Name'}
          type={'text'}
          onChange={() => setValidName(true)}
        />
        <Spacer/>
        <Input
          status={validPrice ? 'default' : 'error'}
          ref={refPrice}
          width={450}
          label={'Price'}
          type={'number'}
          onChange={() => setValidPrice(true)}
        />
        <Spacer/>
        <Input
          status={validDiscount ? 'default' : 'error'}
          ref={refDiscount}
          width={450}
          label={'Discount'}
          type={'number'}
          onChange={() => setValidDiscount(true)}
        />
        <Spacer/>
        <Input.Textarea
          status={validDescription ? 'default' : 'error'}
          ref={refDescription}
          rows={15}
          width={550}
          label={'Description'}
          type={'text'}
          onChange={() => setValidDescription(true)}
        />
      </div>
      <div className={classes.buttonForm}>
        <Button disabled={loading} onClick={handleCreateProduct} color={!loading && 'success'}>Create</Button>
        <Spacer/>
        <Button onClick={handleClear} color={'warning'}>Clear input</Button>
      </div>
    </div>
  </Fragment>
}

export default NewProduct