import Contain from '../layout/Contain'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import classes from './Product.module.css'
import { Button } from '@nextui-org/react'
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
  const [isOpenUpdateProduct, setIsOpenUpdateProduct] = useState(false)
  const [buttonUpdateEnable, setButtonUpdateEnable] = useState(false)

  const loadDataGrid = () => {
    axios.get('/api/product', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => {
        setListProduct(res.data.data)
      })
      .catch(err => {
        toast.error('Load data failed')
      })
    setIsOpenCreateProduct(false)
  }

  useEffect(() => {
    loadDataGrid()
  }, [])

  const handleOpenAddNewProduct = () => {
    setIsOpenCreateProduct(!isOpenCreateProduct)
    setIsOpenUpdateProduct(false)
  }

  const handleDeleteProduct = (id) => {
    toast.info('Deleting product...')
    axios.post('/api/product/delete', {
      ids: selectedProduct,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => {
        loadDataGrid()
        toast.success('Delete product successfully')
      })
      .catch(err => {
        toast.error('Delete product failed')
      })
  }

  return (
    <Fragment>
      <Contain>
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
              setButtonUpdateEnable(e.length === 1)
              setIsOpenUpdateProduct(false)
            }}
          />
        </div>
        <div className={classes.control}>
          <Button auto onClick={handleOpenAddNewProduct}>Add new product</Button>
          {selectedProduct.length !== 0 &&
            <Button auto onClick={handleDeleteProduct} disabled={false} color={'error'}>Delete product
              selected</Button>}
          {selectedProduct.length === 1 && <Button color={'secondary'} auto onClick={() => {
            setIsOpenUpdateProduct(!isOpenUpdateProduct)
            setIsOpenCreateProduct(false)
          }}>Update product</Button>}
        </div>
      </Contain>
      {isOpenCreateProduct && <Contain>
        <NewProduct isUpdate={false} onCreateSuccess={loadDataGrid}/>
      </Contain>}
      {isOpenUpdateProduct && <Contain>
        <NewProduct data={
          listProduct.find(item => item.id === selectedProduct[0])
        } isUpdate={true} onCreateSuccess={loadDataGrid}/>
      </Contain>}
    </Fragment>
  )
}

export default Product