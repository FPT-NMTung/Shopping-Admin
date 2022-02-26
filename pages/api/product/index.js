import Product from '../../../model/product'

const handler = async (req, res) => {
  const [data] = await Product.getAllProducts()

  res.status(200).json({ data })
}

export default handler