import Contain from '../layout/Contain'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'

import classes from './Product.module.css'

const column = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
  },
  {
    field: 'name',
    headerName: 'NAME',
    width: 350,
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
      console.log(rowData)
      return (
        <img
          src={rowData.value}
          alt={rowData.name}
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
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

  useEffect(() => {
    axios.get('/api/product')
      .then(res => {
        setListProduct(res.data.data)
        console.log(res.data.data)
      })
  }, [])

  return (
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
        />
      </div>
    </Contain>
  )
}

export default Product