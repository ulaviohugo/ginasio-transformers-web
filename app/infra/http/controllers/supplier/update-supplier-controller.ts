import { UpdateSupplier } from '@/domain/usecases'
import { EmailInUseError, UnexpectedError } from '../../errors'
import { badRequest, forbidden, notFound, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { SupplierModel, SupplierProductModel } from '@/domain/models'
import { ArrayUtils, NumberUtils, ObjectUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { UploadService } from '@/services'
import { Uploader } from '@/data/protocols/services'
import { dbErrorHandler } from '@/infra/db'

export class UpdateSupplierController implements Controller {
	constructor(
		private readonly UpdateSupplier: UpdateSupplier,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<SupplierModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			request.supplierProducts = ArrayUtils.convertToArray(request.supplierProducts)

			if (!request.supplierProducts || ObjectUtils.isEmpty(request.supplierProducts[0])) {
				return badRequest(new UnexpectedError('Adicione pelo menos 1 produto'))
			}

			let uploader: Uploader = null as any
			if (request.photo && typeof request.photo != 'string') {
				uploader = new UploadService(request.photo, '/suppliers')
			}
			const updatedById = NumberUtils.convertToNumber(request.accountId)

			let supplierProducts: SupplierProductModel[] = ArrayUtils.convertToArray(
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
					phone: NumberUtils.convertToNumber(request.phone).toString(),
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
