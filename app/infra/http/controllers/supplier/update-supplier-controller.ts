import { UpdateSupplier } from '@/app/domain/usecases'
import { EmailInUseError } from '../../errors'
import { badRequest, forbidden, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { Supplier } from '@/app/domain/models'
import { NumberUtils } from '@/app/utils'
import { HttpResponse } from '@/app/data/protocols/http'
import { UploadService } from '@/app/services'
import { Uploader } from '@/app/data/protocols/services'
import { dbErrorHandler } from '@/app/infra/db'

export class UpdateSupplierController implements Controller {
	constructor(
		private readonly UpdateSupplier: UpdateSupplier,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<Supplier>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			let uploader: Uploader = null as any
			if (request.photo && typeof request.photo != 'string') {
				uploader = new UploadService(request.photo, '/suppliers')
			}
			const updatedSupplier = await this.UpdateSupplier.update(
				{
					...request,
					id: NumberUtils.convertToNumber(request.id),
					countryId: NumberUtils.convertToNumber(request.countryId),
					provinceId: NumberUtils.convertToNumber(request.provinceId, true),
					municipalityId: NumberUtils.convertToNumber(request.municipalityId, true),
					categoryId: NumberUtils.convertToNumber(request.categoryId, true),
					productId: NumberUtils.convertToNumber(request.productId, true),
					unitPrice: NumberUtils.convertToNumber(request.unitPrice, true),
					updatedById: NumberUtils.convertToNumber(request.accountId)
				},
				uploader
			)
			if (updatedSupplier == 'notFound') {
				return notFound()
			}
			if (updatedSupplier == 'emailInUse') {
				return forbidden(new EmailInUseError())
			}
			return ok(updatedSupplier)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
