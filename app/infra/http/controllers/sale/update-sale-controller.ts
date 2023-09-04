import { UpdateSale } from '@/app/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { SaleModel } from '@/app/domain/models'
import { NumberUtils } from '@/app/utils'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'

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
				totalValue: NumberUtils.convertToNumber(request.totalValue),
				unitPrice: NumberUtils.convertToNumber(request.unitPrice),
				discount: NumberUtils.convertToNumber(request.discount),
				amountPaid: NumberUtils.convertToNumber(request.amountPaid),
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
