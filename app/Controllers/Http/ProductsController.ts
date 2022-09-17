import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import CreateProductValidator from 'App/Validators/CreateProductValidator'

export default class ProductsController {
   async index({auth,view}: HttpContextContract) {

    const products = await Product.query().orderBy('id')
    
    return view.render('product',{products: products})
  }

   async create({view}: HttpContextContract) {
    return view.render('createpro')
  }

   async store({request,response}: HttpContextContract) {
    const payload = await request.validate(CreateProductValidator)    
    const product = new Product()
        product.name = payload.name
        product.detail = payload.detail
        
        await product.save()

        response.redirect().toRoute('product')
   }

   async show({}: HttpContextContract) {}

   async edit({params,view}: HttpContextContract) {
    const id = params.id
        const product = await Product.query().where('id',id).firstOrFail()
        return view.render('edit', { product: product })
   }

       async update({ params, request, response }: HttpContextContract) {
        const payload = await request.validate(CreateProductValidator)
        const id = params.id
        const product = await Product.query().where('id',id).firstOrFail()

        product!.name = payload.name
        product!.detail = payload.detail

        await product?.save()
        response.redirect().toRoute('product')
       }

   async destroy({params,response}: HttpContextContract) {
    const id = params.id
    const product = await Product.find(id)
    await product?.delete()
    response.redirect().toRoute('product')
   }
}
