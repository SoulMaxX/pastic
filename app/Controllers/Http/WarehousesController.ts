import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Warehouse from 'App/Models/Warehouse'
import CreateWarehouseValidator from 'App/Validators/CreateWarehouseValidator'

export default class WarehousesController {
  public async index({view}: HttpContextContract) {
    
    const warehouses = await Warehouse.query().preload('products')
    // const products = await warehouses.related('products').query()
    // .join('products', 'warehouses.product_id', '=', 'products.id').select('products.*')
        
    // return warehouses
    return view.render('warehouse',{warehouses: warehouses})
  }

  async create({view}: HttpContextContract) {
    const products = await Product.query().orderBy('id')        
    return view.render('createwarehouse',{products: products})
  }

  async store({request,response}: HttpContextContract) {
    const productid = request.input('productId')
    // return productid
    const payload = await request.validate(CreateWarehouseValidator)    
    const warehouse = new Warehouse()
        warehouse.quantity = payload.quantity
        warehouse.productId = productid
        
        await warehouse.save()

        response.redirect().toRoute('warehouse')
   }

  public async show({}: HttpContextContract) {}

  async edit({params,view}: HttpContextContract) {
    const products = await Product.query().orderBy('id') 
    const id = params.id
        const warehouse = await Warehouse.query().where('id',id).firstOrFail()
        return view.render('editwarehouse', { warehouse: warehouse , products: products })
   }

  
   async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(CreateWarehouseValidator)
    const productid = request.input('productId')
    // return productid
    const id = params.id
    const warehouse = await Warehouse.query().where('id',id).firstOrFail()

    warehouse!.quantity = payload.quantity
    warehouse!.productId = productid

    await warehouse?.save()
    response.redirect().toRoute('warehouse')
   }

  async destroy({params,response}: HttpContextContract) {
    const id = params.id
    const warehouse = await Warehouse.find(id)    
    await warehouse?.delete()    
    response.redirect().toRoute('warehouse')
   }
}
