import db from '../config/database'

class Product {
  static getAllProducts() {
    return db.execute('SELECT * FROM product order by updatedAt desc')
  }

  static insertProduct(name, description, image, price, discount) {
    return db.execute('insert into product (name, description, quantity, quantitySold, image, price, discount) values (?, ?, ?, ?, ?, ?, ?);',
      [name, description, 999999, 0, image, price, discount])
  }

  static getProductById(id) {
    return db.execute('SELECT * FROM product where id = ?', [id])
  }

  static updateProduct(id, name, description, image, price, discount) {
    return db.execute('update product set name = ?, description = ?, image = ?, price = ?, discount = ? where id = ?',
      [name, description, image, price, discount, id])
  }

  static deleteProduct(ids) {
    return db.execute(`delete from product where id in (${ids})`)
  }
}

export default Product