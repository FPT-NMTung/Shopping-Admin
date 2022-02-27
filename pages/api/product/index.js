import Product from '../../../model/product'

const handler = async (req, res) => {
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