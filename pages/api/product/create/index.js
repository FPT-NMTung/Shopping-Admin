import Product from '../../../../model/product'
import cloudinary from '../../../../config/cloudinary'
import isAuthenticated from '../../../../config/authRouter'

const handler = async (req, res) => {
  if (!isAuthenticated(req, res)) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  if (req.method === 'POST') {
    const {
      name,
      description,
      price,
      image,
      quantity,
      discount,
    } = req.body

    const urlImage = (await cloudinary.v2.uploader.upload(image)).secure_url

    const data = await Product.insertProduct(name, description, urlImage, price, discount, quantity)
    res.status(200).json({
      status: 'success',
      data,
    })
  } else {
    res.status(405).json({message: 'Method Not Allowed'})
  }
}

export default handler