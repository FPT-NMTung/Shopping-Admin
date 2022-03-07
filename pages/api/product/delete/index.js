import Product from '../../../../model/product'
import isAuthenticated from '../../../../config/authRouter'

const handler = async (req, res) => {
  if (!isAuthenticated(req, res)) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  if (req.method === 'POST') {
    const ids = req.body.ids

    const data = await Product.deleteProduct(ids.join(','))
    res.status(200).json({
      message: 'Delete product success',
    })
  } else {
    res.status(405).json({
      message: 'Method not allowed',
    })
  }
}

export default handler