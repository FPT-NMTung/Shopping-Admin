import db from '../config/database'

class Order {
  static getOrderHistory(status) {
    return db.execute('select order_history.id \'id\',\n' +
      '       order_history.updatedAt \'updatedAt\',\n' +
      '       order_history.createdAt \'createdAt\',\n' +
      '       order_history.quantity \'quantity\',\n' +
      '       u.firstName \'firstName\',\n' +
      '       u.lastName \'lastName\',\n' +
      '       p.name \'name\',\n' +
      '       p.image \'image\',\n' +
      '       a.detail \'detail\',\n' +
      '       w.prefix \'wardPrefix\',\n' +
      '       w.name \'wardName\',\n' +
      '       d.prefix \'districtPrefix\',\n' +
      '       d.name \'districtName\',\n' +
      '       p2.name \'provinceName\'\n' +
      'from order_history\n' +
      'left join product p on order_history.productId = p.id\n' +
      'left join address a on order_history.addressId = a.id\n' +
      'left join user u on order_history.userId = u.id\n' +
      'left join ward w on a.wardId = w.id\n' +
      'left join district d on a.districtId = d.id\n' +
      'left join province p2 on a.provinceId = p2.id\n' +
      'where status = ?\n' +
      'order by order_history.updatedAt desc ', [status])
  }
}

export default Order