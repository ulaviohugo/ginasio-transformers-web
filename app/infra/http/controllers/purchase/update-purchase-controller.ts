import { UpdatePurchase } from '@/app/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { PurchaseModel } from '@/app/domain/models'
import { DateUtils, NumberUtils } from '@/app/utils'
import { HttpResponse } from '@/app/data/protocols/http'
import { UploadService } from '@/app/services'
import { Uploader } from '@/app/data/protocols/services'
import { dbErrorHandler } from '@/app/infra/db'

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
					supplierId: NumberUtils.convertToNumber(request.supplierId),
					categoryId: NumberUtils.convertToNumber(request.categoryId),
					productId: NumberUtils.convertToNumber(request.productId),
					unitPrice: NumberUtils.convertToPrice(request.unitPrice),
					totalValue: NumberUtils.convertToPrice(request.totalValue),
					quantity: NumberUtils.convertToNumber(request.quantity),
					sellingPriceUnit: NumberUtils.convertToPrice(request.sellingPriceUnit),
					paid: !!request.paid,
					purchaseDate: DateUtils.convertToDate(request.purchaseDate),
					dueDate: DateUtils.convertToDate(request.dueDate),
					updatedById: NumberUtils.convertToNumber(request.accountId)
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
