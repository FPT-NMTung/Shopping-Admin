import Contain from '../layout/Contain'
import { Fragment, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'

import classes from './Product.module.css'
import { Button, Input, Spacer } from '@nextui-org/react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import NewProduct from './newProduct/NewProduct'

const column = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
  },
  {
    field: 'name',
    headerName: 'NAME',
    width: 320,
  },
  {
    field: 'price',
    headerName: 'PRICE',
    width: 110,
    type: 'number',
  },
  {
    field: 'discount',
    headerName: 'DISCOUNT',
    width: 110,
    type: 'number',
  },
  {
    field: 'quantity',
    headerName: 'QUANTITY',
    width: 150,
    type: 'number',
  },
  {
    field: 'quantitySold',
    headerName: 'QUANTITY SOLD',
    width: 150,
    type: 'number',
  },
  {
    field: 'image',
    headerName: 'IMAGE',
    width: 150,
    renderCell: (rowData) => {
      return (
        <img
          src={rowData.value}
          alt={rowData.name}
          style={{width: '100px', height: '100px', objectFit: 'cover'}}
        />
      )
    },
  },
  {
    field: 'createdAt',
    headerName: 'CREATED AT',
    width: 150,
  },
  {
    field: 'updatedAt',
    headerName: 'UPDATED AT',
    width: 150,
  },
]

const Product = () => {
  const [listProduct, setListProduct] = useState([])
  const [selectedProduct, setSelectedProduct] = useState([])

  const [isOpenCreateProduct, setIsOpenCreateProduct] = useState(false)

  const loadDataGrid = () => {
    axios.get('/api/product')
      .then(res => {
        setListProduct(res.data.data)
      })
    setIsOpenCreateProduct(false)
  }

  useEffect(() => {
    loadDataGrid()
  }, [])

  const handleOpenAddNewProduct = () => {
    setIsOpenCreateProduct(!isOpenCreateProduct)
  }

  return (
    <Fragment>
      <Contain>
        <div className={classes.main}>
          <DataGrid
            rows={listProduct.map(item => ({
              id: item.id,
              name: item.name,
              price: `$${item.price}`,
              discount: `${item.discount}%`,
              createdAt: (new Date(item.createdAt)).toLocaleString('vi-VN'),
              updatedAt: (new Date(item.updatedAt)).toLocaleString('vi-VN'),
              quantity: item.quantity,
              quantitySold: item.quantitySold,
              image: item.image,
            }))}
            columns={column}
            pageSize={25}
            checkboxSelection
            getRowHeight={() => 100}
            onSelectionModelChange={(e) => {
              setSelectedProduct(e)
            }}
          />
        </div>
        <div className={classes.control}>
          <Button auto disabled={selectedProduct.length === 0} color={'error'}>Delete product selected</Button>
          <Button auto onClick={handleOpenAddNewProduct}>Add new product</Button>
        </div>
      </Contain>
      {isOpenCreateProduct && <Contain>
        <NewProduct onCreateSuccess={loadDataGrid}/>
      </Contain>}
    </Fragment>
  )
}

export default Product