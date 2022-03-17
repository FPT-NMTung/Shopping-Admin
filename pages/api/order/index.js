import isAuthenticated from '../../../config/authRouter'
import Order from '../../../model/order'

const handler = async (req, res) => {
  if (!isAuthenticated(req, res)) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  if (req.method === 'GET') {
    const status = Number.parseInt(req.query.status)

    const [data] = await Order.getOrderHistory(status)
    const result = data.map((item) => {
      return {
        id: item.id,
        data: item
      }
    })
    return res.status(200).json(result)
  } else {
    res.status(405).json({message: 'Method Not Allowed'})
  }
}

export default handler