'use strict'

const SessionController = require("../app/Controllers/Http/SessionController")


const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')


Route.get('/files/:id', 'FileController.show')

Route.group(()=>{
  Route.post('/files', 'FileController.store')

  Route.resource('projects', 'ProjectController').apiOnly().validator(new Map(
    [
      [
        ['projects.store'],['Project']
      ]
    ]
  ))
}).middleware(['auth'])
