import { Fragment } from 'react'
import classes from './ColOrder.module.css'
import { DataGrid } from '@mui/x-data-grid'

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
]

const ColOrder = (props) => {
  return (
    <Fragment>
      <h3 className={classes.title}>{props.title}</h3>
      {/*<DataGrid*/}
      {/*  rows={props.list}*/}
      {/*  columns={column}*/}
      {/*  pageSize={25}*/}
      {/*  checkboxSelection*/}
      {/*  getRowHeight={() => 100}*/}
      {/*  onSelectionModelChange={(e) => {*/}
      {/*    setSelectedProduct(e)*/}
      {/*    setButtonUpdateEnable(e.length === 1)*/}
      {/*    setIsOpenUpdateProduct(false)*/}
      {/*  }}*/}
      {/*/>*/}
    </Fragment>
  )
}

export default ColOrder