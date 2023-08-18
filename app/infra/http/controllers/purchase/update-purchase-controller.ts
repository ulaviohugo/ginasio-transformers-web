import { UpdatePurchase } from '@/app/domain/usecases'
import { badRequest, notFound, ok, serverError } from '../../helper'
import { Controller, Validation } from '../../protocols'
import { Purchase } from '@/app/domain/models'
import { NumberUtils } from '@/app/utils'
import { HttpResponse } from '@/app/data/protocols/http'
import { UploadService } from '@/app/services'
import { Uploader } from '@/app/data/protocols/services'
import { dbErrorHandler } from '@/app/infra/db'

export class UpdatePurchaseController implements Controller {
	constructor(
		private readonly UpdatePurchase: UpdatePurchase,
		private readonly validation: Validation
	) {}
	async handle(request: UpdatePurchaseControllerRequest): Promise<HttpResponse> {
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
					categoryId: NumberUtils.convertToNumber(request.categoryId),
					employeeId: NumberUtils.convertToNumber(request.employeeId),
					productId: NumberUtils.convertToNumber(request.productId),
					unitPrice: NumberUtils.convertToNumber(request.unitPrice),
					totalValue: NumberUtils.convertToNumber(request.totalValue)
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

export type UpdatePurchaseControllerRequest = Purchase
