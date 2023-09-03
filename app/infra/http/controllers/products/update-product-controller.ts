import { UpdateProduct } from '@/app/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { ProductModel } from '@/app/domain/models'
import { NumberUtils } from '@/app/utils'
import { HttpResponse } from '@/app/data/protocols/http'
import { UploadService } from '@/app/services'
import { Uploader } from '@/app/data/protocols/services'
import { dbErrorHandler } from '@/app/infra/db'

export class UpdateProductController implements Controller {
	constructor(
		private readonly UpdateProduct: UpdateProduct,
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
			const updatedProduct = await this.UpdateProduct.update(
				{
					...request,
					id: NumberUtils.convertToNumber(request.id),
					price: NumberUtils.convertToNumber(request.price),
					categoryId: NumberUtils.convertToNumber(request.categoryId),
					updatedById: NumberUtils.convertToNumber(request.accountId)
				},
				uploader
			)
			if (updatedProduct == null) return notFound()
			return ok(updatedProduct)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
