import { UpdateSale } from '@/domain/usecases'
import { badRequest, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { SaleModel } from '@/domain/models'
import { NumberUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'

export class UpdateSaleController implements Controller {
	constructor(
		private readonly UpdateSale: UpdateSale,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<SaleModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}

			const updatedSale = await this.UpdateSale.update({
				...request,
				id: NumberUtils.convertToNumber(request.id),
				purchaseId: NumberUtils.convertToNumber(request.purchaseId),
				customer_id: NumberUtils.convertToNumber(request.customer_id),
				quantity: NumberUtils.convertToNumber(request.quantity),
				employee_id: undefined as any,
				total_value: NumberUtils.convertToPrice(request.total_value),
				unit_price: NumberUtils.convertToPrice(request.unit_price),
				discount: NumberUtils.convertToPrice(request.discount),
				amount_paid: NumberUtils.convertToPrice(request.amount_paid),
				user_id_update: NumberUtils.convertToNumber(request.accountId),
				updated_at: new Date()
			})
			if (updatedSale == 'notFound') {
				return notFound()
			}
			return ok(updatedSale)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
