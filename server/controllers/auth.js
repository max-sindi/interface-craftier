import User from '../models/User'
import jwt from 'jsonwebtoken'
const secret = process.env.JWT_SECRET_KEY
const  bcrypt  =  require('bcryptjs');

export const login = async (request, response) => {
  const {email, password} = request.body
  const user = await User.findOne({email})
  const errorMessage = 'Wrong credentials'
  let status = 200
  let dataToResponse = null

  if(!user) {
    status = 401
    dataToResponse = errorMessage
  } else {
    const isValid = user.verifyPasswordSync(password)
    if(!isValid) {
      status = 401
      dataToResponse = errorMessage
    } else {
      dataToResponse = {
        ok: true,
        token: jwt.sign(
          { email },
          secret,
          { expiresIn: '24h' }
        )
      }
    }
  }

  response.status(status).json(dataToResponse)
}

export const signup = async(request, response) => {
  const {email, password} = request.body

  try {
    const user = await User.create({email, password: bcrypt.hashSync(password)})
    response.status(200).json(user)
  } catch(e) {
    response.status(501).json(e)
  }
}

export const isTokenValid = async(request, response) => {
  response.json({ok: true})
}

export const isEmailAvailable = async(request, response) => {
  const {email} = request.body

  const count = await User.count({email})
  response.json({ok: !count})
}
