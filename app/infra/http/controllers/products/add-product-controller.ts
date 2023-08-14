import { AddProduct } from '@/app/domain/usecases'
import { NameInUseError } from '../../errors'
import { badRequest, forbidden, ok, serverError } from '../../helper'
import { Controller, Validation } from '../../protocols'
import { Product } from '@/app/domain/models'
import { UploadService } from '@/app/services'
import { HttpResponse } from '@/app/data/protocols/http'
import { Uploader } from '@/app/data/protocols/services'
import { NumberUtils } from '@/app/utils'

export class AddProductController implements Controller {
	constructor(
		private readonly addProduct: AddProduct,
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
			const createdProduct = await this.addProduct.add(
				{
					...request,
					categoryId: NumberUtils.convertToNumber(request.categoryId)
				},
				uploader
			)

			if (createdProduct == null) {
				return forbidden(new NameInUseError())
			}
			return ok(createdProduct)
		} catch (error) {
			return serverError(error)
		}
	}
}
