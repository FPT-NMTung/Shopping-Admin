import { Fragment } from 'react'
import classes from './ColOrder.module.css'
import { DataGrid } from '@mui/x-data-grid'

const column = [
  {
    field: 'id',
    headerName: 'ID',
    width: 40,
  },
  {
    field: 'data',
    headerName: 'DETAIL',
    width: 260,
    renderCell: (data) => {
      const dataTemp = data.value
      return (
        <div>
          <div className={classes.cellName}>
            <img
              src={dataTemp.image}
              style={{width: '50px', height: '50px', objectFit: 'cover'}}
            />
            <div>
              <p><b>{dataTemp.name}</b></p>
              <p><b>Quantity:</b> {dataTemp.quantity}</p>
            </div>
          </div>
          <div className={classes.information}>
            <p className={classes.nameOrder}><b>Name:</b> {dataTemp.firstName} {dataTemp.lastName}</p>
            <p className={classes.address}><b>Address:</b> {dataTemp.detail}, {dataTemp.wardPrefix} {dataTemp.wardName},<br/> {dataTemp.districtPrefix} {dataTemp.districtName}, {dataTemp.provinceName}</p>
            <p><b>Created At:</b> {new Date(dataTemp.createdAt).toLocaleString('en-US',
              {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</p>
            <p><b>Updated At:</b> {new Date(dataTemp.updatedAt).toLocaleString('en-US',
              {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</p>
          </div>
        </div>
      )
    },
  },
]

const ColOrder = (props) => {
  return (
    <Fragment>
      <h3 className={classes.title}>{props.title}</h3>
      <DataGrid
        rows={props.dataTable}
        columns={column}
        pageSize={25}
        checkboxSelection
        getRowHeight={() => 200}
        onSelectionModelChange={(e) => {
          props.setSelectedProduct(e)
          // setButtonUpdateEnable(e.length === 1)
          // setIsOpenUpdateProduct(false)
        }}
        selectionModel={props.selectionModel}
      />
    </Fragment>
  )
}

export default ColOrder