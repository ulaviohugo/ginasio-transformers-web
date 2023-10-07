import { UpdatePurchase } from '@/domain/usecases'
import { badRequest, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { PurchaseModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { UploadService } from '@/services'
import { Uploader } from '@/data/protocols/services'
import { dbErrorHandler } from '@/infra/db'

export class UpdatePurchaseController implements Controller {
	constructor(
		private readonly UpdatePurchase: UpdatePurchase,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<PurchaseModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			let uploader: Uploader = null as any
			if (request.photo && typeof request.photo != 'string') {
				uploader = new UploadService(request.photo, '/purchases')
			}
			const updatedPurchase = await this.UpdatePurchase.update(
				{
					...request,
					id: NumberUtils.convertToNumber(request.id),
					supplier_id: NumberUtils.convertToNumber(request.supplier_id),
					category_id: NumberUtils.convertToNumber(request.category_id),
					product_id: NumberUtils.convertToNumber(request.product_id),
					unit_price: NumberUtils.convertToPrice(request.unit_price),
					total_value: NumberUtils.convertToPrice(request.total_value),
					quantity: NumberUtils.convertToNumber(request.quantity),
					selling_price_unit: NumberUtils.convertToPrice(request.selling_price_unit),
					paid: !!request.paid,
					purchase_date: DateUtils.convertToDate(request.purchase_date),
					due_date: DateUtils.convertToDate(request.due_date),
					user_id_update: NumberUtils.convertToNumber(request.accountId)
				},
				uploader
			)
			if (updatedPurchase == 'notFound') {
				return notFound()
			}
			return ok(updatedPurchase)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
