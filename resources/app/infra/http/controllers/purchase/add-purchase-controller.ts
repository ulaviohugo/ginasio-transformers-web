import { AddPurchase } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { PurchaseModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'
import { UploadService } from '@/services'
import { HttpResponse } from '@/data/protocols/http'
import { Uploader } from '@/data/protocols/services'
import { dbErrorHandler } from '@/infra/db'

export class AddPurchaseController implements Controller {
	constructor(
		private readonly addPurchase: AddPurchase,
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
			const createdById = NumberUtils.convertToNumber(request.accountId)
			const createdPurchase = await this.addPurchase.add(
				{
					...request,
					supplierId: NumberUtils.convertToNumber(request.supplierId),
					categoryId: NumberUtils.convertToNumber(request.categoryId),
					employeeId:
						NumberUtils.convertToNumber(request.employeeId, true) || createdById,
					productId: NumberUtils.convertToNumber(request.productId),
					unitPrice: NumberUtils.convertToPrice(request.unitPrice),
					totalValue: NumberUtils.convertToPrice(request.totalValue),
					quantity: NumberUtils.convertToNumber(request.quantity),
					sellingPriceUnit: NumberUtils.convertToPrice(request.sellingPriceUnit),
					paid: !!request.paid,
					purchaseDate: DateUtils.convertToDate(request.purchaseDate),
					dueDate: DateUtils.convertToDate(request.dueDate),
					createdById
				},
				uploader
			)
			return ok(createdPurchase)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
