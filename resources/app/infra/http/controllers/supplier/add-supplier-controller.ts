import { AddSupplier } from '@/domain/usecases'
import { EmailInUseError, MissingParamError, UnexpectedError } from '@/infra/http/errors'
import { badRequest, forbidden, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { SupplierModel, SupplierProductModel } from '@/domain/models'
import { ArrayUtils, NumberUtils, ObjectUtils } from '@/utils'
import { UploadService } from '@/services'
import { HttpResponse } from '@/data/protocols/http'
import { Uploader } from '@/data/protocols/services'
import { dbErrorHandler } from '@/infra/db'

export class AddSupplierController implements Controller {
	constructor(
		private readonly addSupplier: AddSupplier,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<SupplierModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			request.supplier_products = ArrayUtils.convertToArray(request.supplier_products)

			if (
				!request.supplier_products ||
				ObjectUtils.isEmpty(request.supplier_products[0])
			) {
				return badRequest(new UnexpectedError('Adicione pelo menos 1 produto'))
			}

			let uploader: Uploader = null as any
			if (request.photo && typeof request.photo != 'string') {
				uploader = new UploadService(request.photo, '/suppliers')
			}
			const user_id = NumberUtils.convertToNumber(request.accountId)

			let supplierProducts: SupplierProductModel[] = ArrayUtils.convertToArray(
				request.supplier_products
			)

			supplierProducts = supplierProducts?.map((sp) => ({
				category_id: NumberUtils.convertToNumber(sp.category_id),
				product_id: NumberUtils.convertToNumber(sp.product_id),
				unit_price: NumberUtils.convertToNumber(sp.unit_price),
				user_id
			})) as any

			const createdSupplier = await this.addSupplier.add(
				{
					...request,
					supplier_products: supplierProducts,
					country_id: NumberUtils.convertToNumber(request.country_id),
					province_id: NumberUtils.convertToNumber(request.province_id, true),
					municipality_id: NumberUtils.convertToNumber(request.municipality_id, true),
					phone: NumberUtils.convertToNumber(request.phone).toString(),
					user_id
				},
				uploader
			)

			if (createdSupplier == 'emailInUse') {
				return forbidden(new EmailInUseError())
			}
			return ok(createdSupplier)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
