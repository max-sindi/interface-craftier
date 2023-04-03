import sendResponse from './middlewares/sendResponse'
import checkToken from "./middlewares/checkToken"
import * as usersController from "./controllers/user"
import * as authController from './controllers/auth'
import * as weatherController from './controllers/weather'
import * as wace from './controllers/wace'

const router = require('express-promise-router')()

module.exports = (app) => {
  router.get('/api/services/ping', function(req, res, next) {
    res.status(200).json({ok: true, message: 'Successful lifecheck'})
  })

  /* AUTH */
  router.post('/api/auth/login', authController.login)
  router.post('/api/auth/signup', authController.signup)
  router.post('/api/auth/email-available', authController.isEmailAvailable)
  router.get('/api/auth/check-token', checkToken, authController.isTokenValid)

  router.get('/api/weather', weatherController.get)
  router.get('/api/cities', weatherController.cities)


  /* USERS */
  router.get('/api/user/', /*checkToken,*/ usersController.getList, sendResponse)
  router.post('/api/user/', /*checkToken,*/ usersController.create, sendResponse)
  router.post('/api/user/:id/comment', /*checkToken,*/ usersController.comment, sendResponse)
  router.get('/api/user/:id', /*checkToken,*/ usersController.getSingle, sendResponse)
  router.put('/api/user/:id', /*checkToken,*/ usersController.update, sendResponse)
  router.delete('/api/user/:id', /*checkToken,*/ usersController.destroy, sendResponse)
  router.get('/api/comments', usersController.fetchComments)

  /* wace */
  router.post('/api/wace', wace.update)
  router.get('/api/wace', wace.getStateController)
  router.get('/api/wace/files', wace.getFiles)
  router.delete('/api/wace', wace.deleteState)
  router.post('/api/wace/asset', ...wace.uploadAssets)
  router.delete(`/api/wace/asset/:fileName`, wace.deleteFile)
  router.get('/api/wace/compile', wace.compile)
  router.post('/api/wace/readFigma', wace.readFigma)

  /* USE ROUTER */
  app.use('/', router)
}
