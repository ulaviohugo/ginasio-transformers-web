import { UpdateSupplier } from '@/app/domain/usecases'
import { EmailInUseError } from '../../errors'
import { badRequest, forbidden, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { Supplier, SupplierProduct } from '@/app/domain/models'
import { ArrayUtils, NumberUtils } from '@/app/utils'
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
			const updatedById = NumberUtils.convertToNumber(request.accountId)

			let supplierProducts: SupplierProduct[] = ArrayUtils.convertToArray(
				request.supplierProducts
			)

			supplierProducts = supplierProducts?.map((sp) => ({
				supplierId: NumberUtils.convertToNumber(request.id),
				categoryId: NumberUtils.convertToNumber(sp.categoryId),
				productId: NumberUtils.convertToNumber(sp.productId),
				unitPrice: NumberUtils.convertToNumber(sp.unitPrice),
				updatedById,
				createdById: updatedById
			})) as any

			const updatedSupplier = await this.UpdateSupplier.update(
				{
					...request,
					id: NumberUtils.convertToNumber(request.id),
					supplierProducts,
					countryId: NumberUtils.convertToNumber(request.countryId),
					provinceId: NumberUtils.convertToNumber(request.provinceId, true),
					municipalityId: NumberUtils.convertToNumber(request.municipalityId, true),
					updatedById
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
