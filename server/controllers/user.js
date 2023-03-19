import User from '../models/User'
import Comment from '../models/Comment'
import Joi from "joi"


const schema = Joi.object().keys({
  email: Joi.string().email().min(7).max(30),
  password: Joi.string().min(4).max(30),
})

export const getList = async (request, response, next) => {
  const {limit = 20, offset = 0, search = ''} = request.query;
  // todo: do performance test: current populate place VS at the end of pipe
  response.data = await User.find().populate('received_comments').skip(+offset).limit(+limit);
  next()
}

export const getSingle = async (request, response, next) => {
  response.data = await User.findById(request.params.id);
  next()
}

export const create = async (request, response, next) => {
  const validated = Joi.validate(request.body, schema);

  if(validated.error) {
    return response.status(422).json(validated.error);
  } else {
    response.data = await User.create(validated.value);
    next()
  }
}

export const update = async (request, response, next) => {
  const {body, params: {id}} = request;
  const validated = Joi.validate(body, schema);

  if(validated.error) {
    response.status(422).json(validated.error)
  } else {
    response.data = await User.findByIdAndUpdate(id, body, {new: true});
    next()
  }
}

export const destroy = async (request, response, next) => {
  response.data = await User.findByIdAndDelete(request.params.id);
  next();
}


export const comment = async (request, response) => {
  const commentData = Object.assign(request.body, {
    targetUserId: request.params.id
  })
  const comment = await Comment.create(commentData)
  const user = await User.findByIdAndUpdate(request.params.id, {"$push": {received_comments: comment.id}}, {new: true})
  response.json(user)
}

export const fetchComments = async (request, response, next) => {
  response.json(await Comment.find() )
}