import sendResponse from './middlewares/sendResponse'
import checkToken from "./middlewares/checkToken"
import * as usersController from "./controllers/user"
import * as authController from './controllers/auth'
// import * as todosController from './controllers/todos'
import * as weatherController from './controllers/weather'
// import * as boardsController from './controllers/boards'
// import * as todoListsController from './controllers/todoLists'
import * as Z from './controllers/z'
// import {updateVariables} from './controllers/z'
// const upload = require('multer')({});


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


  /* TODOS */
  // router.get('/api/todos/', /*checkToken,*/ todosController.getting, sendResponse)
  // router.post('/api/todos/', /*checkToken,*/ todosController.creating, sendResponse)
  // router.get('/api/todos/:id', /*checkToken,*/ todosController.gettingSingle, sendResponse)
  // router.put('/api/todos/:id', /*checkToken,*/ todosController.updating, sendResponse)
  // router.delete('/api/todos/:id', /*checkToken,*/ todosController.deleting, sendResponse)

  /* BOARDS */
  // router.get('/api/board/', /*checkToken,*/ boardsController.fetchList)
  // router.post('/api/board/', /*checkToken,*/ boardsController.create)
  // router.get('/api/board/:id', /*checkToken,*/ boardsController.fetchSingle)
  // router.put('/api/board/:id', /*checkToken,*/ boardsController.update)
  // router.delete('/api/board/:id', /*checkToken,*/ boardsController.destroy)
  // router.post('/api/board/:id/todo-list', boardsController.createTodoList)

  /* TODOLISTS*/
  // router.get('/api/todo-list/', /*checkToken,*/ todoListsController.fetchList)
  // router.get('/api/todo-list/:id', /*checkToken,*/ todoListsController.fetchSingle)
  // router.post('/api/todo-list/', /*checkToken,*/ todoListsController.create)
  // router.put('/api/todo-list/:id', /*checkToken,*/ todoListsController.update)
  // router.delete('/api/todo-list/:id', /*checkToken,*/ todoListsController.destroy)
  // router.post('/api/todo-list/:id/todo', todoListsController.createTodo)

  /* z */
  router.post('/api/wace', Z.update)
  router.get('/api/wace', Z.getState)
  router.get('/api/wace/files', Z.getFiles)
  router.delete('/api/wace', Z.deleteState)
  router.post('/api/z/asset', ...Z.uploadAssets)


  /* USE ROUTER */
  app.use('/', router)
}
