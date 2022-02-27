import jwt from 'jsonwebtoken';

const isAuthenticated = (req) => {
  // req.headers.authorization;
  const header = req.headers.authorization
  if (header) {
    const token = header.split(' ')[1];
    try {
      const payload = jwt.verify(token, 'gVkYp3s6v9y$B?E(H+MbQeThWmZq4t7w!z%C*F)J@NcRfUjXn2r5u8x/A?D(G+Ka')
      console.log(payload);
      if (payload['username'] === 'admin') {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}

export default isAuthenticated;