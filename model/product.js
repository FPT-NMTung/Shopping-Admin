import db from '../config/database'

class Product {
  static getAllProducts() {
    return db.execute('SELECT * FROM product')
  }
}

export default Product