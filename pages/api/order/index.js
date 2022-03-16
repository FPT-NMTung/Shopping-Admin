import isAuthenticated from '../../../../config/authRouter'

const handler = async (req, res) => {
  if (!isAuthenticated(req, res)) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  if (req.method === 'GET') {

  } else {
    res.status(405).json({message: 'Method Not Allowed'})
  }
}

export default handler