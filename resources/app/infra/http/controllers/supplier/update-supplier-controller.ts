import { UpdateSupplier } from '@/domain/usecases'
import { EmailInUseError, UnexpectedError } from '@/infra/http/errors'
import { badRequest, forbidden, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { SupplierModel, SupplierProductModel } from '@/domain/models'
import { ArrayUtils, NumberUtils, ObjectUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { UploadService } from '@/services'
import { Uploader } from '@/data/protocols/services'
import { dbErrorHandler } from '@/infra/db'

export class UpdateSupplierController implements Controller {
	constructor(
		private readonly UpdateSupplier: UpdateSupplier,
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
			const user_id_update = NumberUtils.convertToNumber(request.accountId)

			let supplierProducts: SupplierProductModel[] = ArrayUtils.convertToArray(
				request.supplier_products
			)

			supplierProducts = supplierProducts?.map((sp) => ({
				supplier_id: NumberUtils.convertToNumber(request.id),
				category_id: NumberUtils.convertToNumber(sp.category_id),
				product_id: NumberUtils.convertToNumber(sp.product_id),
				unit_price: NumberUtils.convertToNumber(sp.unit_price),
				user_id_update,
				user_id: user_id_update
			})) as any

			const updatedSupplier = await this.UpdateSupplier.update(
				{
					...request,
					id: NumberUtils.convertToNumber(request.id),
					supplier_products: supplierProducts,
					country_id: NumberUtils.convertToNumber(request.country_id),
					province_id: NumberUtils.convertToNumber(request.province_id, true),
					municipality_id: NumberUtils.convertToNumber(request.municipality_id, true),
					phone: NumberUtils.convertToNumber(request.phone).toString(),
					user_id_update
				},
				uploader
			)
			if (updatedSupplier == 'notFound') {
				return notFound()
			}
			if (updatedSupplier == 'emailInUse') {
				return forbidden(new EmailInUseError())
			}
			return ok(updatedSupplier)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
