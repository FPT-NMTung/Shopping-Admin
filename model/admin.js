import db from '../config/database'

class Admin {
  static getAdmin(username) {
    return db.execute('SELECT * FROM admin where username = ?', [username])
  }
}

export default Admin