import Admin from '../../../model/admin'
import bscrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {username, password} = req.body

    const [data] = await Admin.getAdmin(username)
    if (data.length === 0) {
      return res.status(403).json({
        message: 'Forbidden'
      })
    }

    const admin = data[0]

    const isPasswordValid = await bscrypt.compare(password, admin.password)
    if (!isPasswordValid) {
      return res.status(403).json({
        message: 'Forbidden'
      })
    }

    const token = jwt.sign({
      id: admin.id,
      username: admin.username,
    }, 'gVkYp3s6v9y$B?E(H+MbQeThWmZq4t7w!z%C*F)J@NcRfUjXn2r5u8x/A?D(G+Ka')

    return res.status(200).json({
      message: 'Success',
      token: token
    })
  } else {
    res.status(403).json({ message: 'Forbidden' })
  }
}

export default handler