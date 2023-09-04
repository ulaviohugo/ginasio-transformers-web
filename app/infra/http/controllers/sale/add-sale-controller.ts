import { AddSale } from '@/app/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { SaleModel } from '@/app/domain/models'
import { NumberUtils } from '@/app/utils'
import { HttpResponse } from '@/app/data/protocols/http'
import { dbErrorHandler } from '@/app/infra/db'
import { PurchaseRepository } from '@/app/data/protocols'

export class AddSaleController implements Controller {
	constructor(
		private readonly addSale: AddSale,
		private readonly validation: Validation,
		private readonly purchaseRepository: PurchaseRepository
	) {}
	async handle(request: ControllerParams<SaleModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}

			const purchaseId = NumberUtils.convertToNumber(request.purchaseId)
			const quantity = NumberUtils.convertToNumber(request.quantity)

			const purchase = await this.purchaseRepository.findById(purchaseId)

			if (!purchase) return notFound('O produto não está no estoque')
			if (purchase.quantity < quantity) {
				return badRequest(new Error('Produto não disponível em quantidade suficiente'))
			}

			const createdById = NumberUtils.convertToNumber(request.accountId)

			const createdSale = await this.addSale.add({
				...request,
				purchaseId,
				customerId: request.customerId && NumberUtils.convertToNumber(request.customerId),
				quantity,
				employeeId: NumberUtils.convertToNumber(request.employeeId) || createdById,
				totalValue: NumberUtils.convertToNumber(request.totalValue),
				unitPrice: NumberUtils.convertToNumber(request.unitPrice),
				amountPaid: NumberUtils.convertToNumber(request.amountPaid),
				discount: NumberUtils.convertToNumber(request.discount),
				createdById
			})

			await this.purchaseRepository.update({
				...purchase,
				quantity: purchase.quantity - quantity
			})

			return ok(createdSale)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
