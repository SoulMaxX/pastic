/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('login')
})

Route.on('/login').render('login').as('login')
Route.on('/register').render('register').as('register')
Route.post('users/login','UsersController.login').as('users.login')
Route.post('users/register','UsersController.register').as('users.register')
Route.get('/logout','UsersController.logout').as('users.logout')


Route.group(()=>{

Route.get('/product', 'ProductsController.index').as('product')
Route.get('/product/create', 'ProductsController.create').as('product.create')
Route.post('/product', 'ProductsController.store').as('product.store')
Route.get('/product/:id/edit', 'ProductsController.edit').as('product.edit')
Route.post('/product/:id/update', 'ProductsController.update').as('product.update')
Route.get('/product/:id/delete', 'ProductsController.destroy').as('product.delete')

Route.get('/warehouse', 'WarehousesController.index').as('warehouse')
Route.get('/warehouse/create', 'WarehousesController.create').as('warehouse.create')
Route.post('/warehouse', 'WarehousesController.store').as('warehouse.store')
Route.get('/warehouse/:id/edit', 'WarehousesController.edit').as('warehouse.edit')
Route.post('/warehouse/:id/update', 'WarehousesController.update').as('warehouse.update')
Route.get('/warehouse/:id/delete', 'WarehousesController.destroy').as('warehouse.delete')

  }).middleware('auth')