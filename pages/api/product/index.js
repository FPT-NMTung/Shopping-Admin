import Product from '../../../model/product'
import isAuthenticated from '../../../config/authRouter'

const handler = async (req, res) => {
  if (!isAuthenticated(req, res)) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  if (req.method === 'GET') {
    const [data] = await Product.getAllProducts()

    res.status(200).json({
      message: 'success',
      data
    })
  } else {
    res.status(405).json({message: 'Method Not Allowed'})
  }
}

export default handler