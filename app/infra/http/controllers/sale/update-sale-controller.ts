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
				customerId: NumberUtils.convertToNumber(request.customerId),
				quantity: NumberUtils.convertToNumber(request.quantity),
				employeeId: undefined as any,
				totalValue: NumberUtils.convertToPrice(request.totalValue),
				unitPrice: NumberUtils.convertToPrice(request.unitPrice),
				discount: NumberUtils.convertToPrice(request.discount),
				amountPaid: NumberUtils.convertToPrice(request.amountPaid),
				updatedById: NumberUtils.convertToNumber(request.accountId),
				updatedAt: new Date()
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
