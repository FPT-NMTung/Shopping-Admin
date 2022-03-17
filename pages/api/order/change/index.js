import isAuthenticated from '../../../../config/authRouter'
import Order from '../../../../model/order'

const handler = async (req, res) => {
  if (!isAuthenticated(req, res)) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  if (req.method === 'POST') {

    const ids = req.body.ids
    const status = req.body.status

    await Order.updateStatus(ids.join(', '), status)

    return res.status(200).json({
      message: 'Success'
    })
  } else {
    res.status(405).json({message: 'Method Not Allowed'})
  }
}

export default handler