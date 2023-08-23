import { UpdateSale } from '@/app/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { Sale } from '@/app/domain/models'
import { NumberUtils } from '@/app/utils'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

export class UpdateSaleController implements Controller {
	constructor(
		private readonly UpdateSale: UpdateSale,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<Sale>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			const updatedSale = await this.UpdateSale.update({
				...request,
				purchaseId: NumberUtils.convertToNumber(request.purchaseId),
				quantity: NumberUtils.convertToNumber(request.quantity),
				employeeId: NumberUtils.convertToNumber(request.employeeId, true) || 1,
				totalValue: NumberUtils.convertToNumber(request.totalValue),
				unitPrice: NumberUtils.convertToNumber(request.unitPrice),
				discount: NumberUtils.convertToNumber(request.discount),
				updatedById: NumberUtils.convertToNumber(request.accountId)
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
