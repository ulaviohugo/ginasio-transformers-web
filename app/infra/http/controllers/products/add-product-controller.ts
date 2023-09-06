import { AddProduct } from '@/domain/usecases'
import { NameInUseError } from '../../errors'
import { badRequest, forbidden, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { ProductModel } from '@/domain/models'
import { UploadService } from '@/services'
import { HttpResponse } from '@/data/protocols/http'
import { Uploader } from '@/data/protocols/services'
import { NumberUtils } from '@/utils'
import { dbErrorHandler } from '@/infra/db'

export class AddProductController implements Controller {
	constructor(
		private readonly addProduct: AddProduct,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<ProductModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			let uploader: Uploader = null as any
			if (request.photo && typeof request.photo != 'string') {
				uploader = new UploadService(request.photo, '/products')
			}
			const createdProduct = await this.addProduct.add(
				{
					...request,
					categoryId: NumberUtils.convertToNumber(request.categoryId),
					createdById: NumberUtils.convertToNumber(request.accountId)
				},
				uploader
			)

			if (createdProduct == null) {
				return forbidden(new NameInUseError())
			}
			return ok(createdProduct)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
