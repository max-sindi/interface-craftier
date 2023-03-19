import multer from "multer"
import {readdirSync} from "fs"
const path = require('path');

const current = 'current'

const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

const upload = require('multer')({
  storage: multer.diskStorage({
    filename: function (req, file, callback) {
      callback(null, file.originalname.replace(' ', ''));
    },
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    }
  }),
})

export const getState = async (request, response) => {
  response.json( JSON.parse (await getAsync(current)))
}

export const getResult = async (request, response) => {
  const state = JSON.parse (await getAsync(current))
  response.json( )
}

export const getFiles =  async (request, response) => {
    response.json(await readdirSync('public/uploads').map(path => '/uploads/' + path))
}

export const deleteState = async (request, response) => {
  response.json({ ok: await client.set(current, '')})
}

export const update = async (request, response) => {
  try {
    // console.log('im in update, data:', request.body)
    client.set(current, JSON.stringify(request.body))
    response.json(JSON.parse(await getAsync(current)))
  } catch (e) {
    response.status(500).send(e)
  }
}

export const uploadAssets = [
  upload.array('asset'),
  async (req, res) => {
    res.redirect(req.headers.origin)
  }
]