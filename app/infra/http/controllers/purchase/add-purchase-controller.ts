import { AddPurchase } from '@/app/domain/usecases'
import { badRequest, ok, serverError } from '../../helper'
import { Controller, Validation } from '../../protocols'
import { Purchase } from '@/app/domain/models'
import { DateUtils, NumberUtils } from '@/app/utils'
import { UploadService } from '@/app/services'
import { HttpResponse } from '@/app/data/protocols/http'
import { Uploader } from '@/app/data/protocols/services'
import { dbErrorHandler } from '@/app/infra/db'

export class AddPurchaseController implements Controller {
	constructor(
		private readonly addPurchase: AddPurchase,
		private readonly validation: Validation
	) {}
	async handle(request: AddPurchaseControllerRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			let uploader: Uploader = null as any
			if (request.photo && typeof request.photo != 'string') {
				uploader = new UploadService(request.photo, '/purchases')
			}
			const createdPurchase = await this.addPurchase.add(
				{
					...request,
					supplierId: NumberUtils.convertToNumber(request.supplierId),
					categoryId: NumberUtils.convertToNumber(request.categoryId),
					employeeId: NumberUtils.convertToNumber(request.employeeId, true) || 1,
					productId: NumberUtils.convertToNumber(request.productId),
					unitPrice: NumberUtils.convertToNumber(request.unitPrice),
					totalValue: NumberUtils.convertToNumber(request.totalValue),
					quantity: NumberUtils.convertToNumber(request.quantity),
					paid: !!request.paid,
					purchaseDate: DateUtils.convertToDate(request.purchaseDate),
					dueDate: DateUtils.convertToDate(request.dueDate)
				},
				uploader
			)
			return ok(createdPurchase)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}

export type AddPurchaseControllerRequest = Purchase