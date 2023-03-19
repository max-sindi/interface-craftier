const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET_KEY

const checkToken = (request, response, next) => {
  // next()
  const token = request.headers['authorization']
  const errorMessage = 'Permission denied'

  if(!token) {
    console.log('Token is not provided')
    response.status(401).json({ok: false, message: errorMessage})
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if(err) {
        console.log('Invalid token')
        response.status(401).json({ok: false, message: errorMessage})
      } else {
        request.email = decoded.email
        next()
      }
    })
  }
}

export default checkToken
