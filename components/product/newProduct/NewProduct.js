import { Fragment, useRef, useState } from 'react'
import classes from './NewProduct.module.css'
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import { Button, Input, Spacer } from '@nextui-org/react'
import { Slider } from '@mui/material'
import axios from 'axios'

const NewProduct = ({
                      onCreateSuccess
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

    setLoading(true)
    axios.post('/api/product/create', {
      image,
      name,
      price,
      discount,
      description,
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
      })
      .catch(() => {
        alert('Error creating product, please contact NMTung')
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