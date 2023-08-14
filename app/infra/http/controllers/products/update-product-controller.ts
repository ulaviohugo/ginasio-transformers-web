import { UpdateProduct } from '@/app/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, Validation } from '../../protocols'
import { Product } from '@/app/domain/models'
import { NumberUtils } from '@/app/utils'
import { HttpResponse } from '@/app/data/protocols/http'
import { UploadService } from '@/app/services'
import { Uploader } from '@/app/data/protocols/services'

export class UpdateProductController implements Controller {
	constructor(
		private readonly UpdateProduct: UpdateProduct,
		private readonly validation: Validation
	) {}
	async handle(request: Product): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			let uploader: Uploader = null as any
			if (request.image && typeof request.image != 'string') {
				uploader = new UploadService(request.image, '/employees')
			}
			const updatedProduct = await this.UpdateProduct.update(
				{
					...request,
					id: NumberUtils.convertToNumber(request.id),
					price: NumberUtils.convertToNumber(request.price),
					categoryId: NumberUtils.convertToNumber(request.categoryId)
				},
				uploader
			)
			if (updatedProduct == null) return notFound()
			return ok(updatedProduct)
		} catch (error) {
			return serverError(error)
		}
	}
}
