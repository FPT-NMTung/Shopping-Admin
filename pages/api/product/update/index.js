import Product from '../../../../model/product'
import isAuthenticated from '../../../../config/authRouter'
import cloudinary from '../../../../config/cloudinary'

const handler = async (req, res) => {
  if (!isAuthenticated(req, res)) {
    return res.status(401).send({error: 'Unauthorized'})
  }
  if (req.method === 'POST') {
    const {id, name, price, description, image, discount, quantity} = req.body

    const urlImage = (await cloudinary.v2.uploader.upload(image)).secure_url
    await Product.updateProduct(id, name, description, urlImage, price, discount, quantity)

    return res.status(200).send({message: 'Product updated'})
  }
}

export default handler