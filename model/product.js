import db from './config'

class Product {
  static getAllProducts() {
    return db.execute('SELECT * FROM product')
  }
}

export default Product