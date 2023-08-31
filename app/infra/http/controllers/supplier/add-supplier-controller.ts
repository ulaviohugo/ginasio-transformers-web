import { AddSupplier } from '@/app/domain/usecases'
import { EmailInUseError, MissingParamError, UnexpectedError } from '../../errors'
import { badRequest, forbidden, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { Supplier, SupplierProduct } from '@/app/domain/models'
import { ArrayUtils, NumberUtils, ObjectUtils } from '@/app/utils'
import { UploadService } from '@/app/services'
import { HttpResponse } from '@/app/data/protocols/http'
import { Uploader } from '@/app/data/protocols/services'
import { dbErrorHandler } from '@/app/infra/db'

export class AddSupplierController implements Controller {
	constructor(
		private readonly addSupplier: AddSupplier,
		private readonly validation: Validation
	) {}
	async handle(request: ControllerParams<Supplier>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}
			if (!request.supplierProducts || ObjectUtils.isEmpty(request.supplierProducts[0])) {
				return badRequest(new UnexpectedError('Adicione pelo menos 1 produto'))
			}

			let uploader: Uploader = null as any
			if (request.photo && typeof request.photo != 'string') {
				uploader = new UploadService(request.photo, '/suppliers')
			}
			const createdById = NumberUtils.convertToNumber(request.accountId)

			let supplierProducts: SupplierProduct[] = ArrayUtils.convertToArray(
				request.supplierProducts
			)

			supplierProducts = supplierProducts?.map((sp) => ({
				categoryId: NumberUtils.convertToNumber(sp.categoryId),
				productId: NumberUtils.convertToNumber(sp.productId),
				unitPrice: NumberUtils.convertToNumber(sp.unitPrice),
				createdById
			})) as any

			const createdSupplier = await this.addSupplier.add(
				{
					...request,
					supplierProducts,
					countryId: NumberUtils.convertToNumber(request.countryId),
					provinceId: NumberUtils.convertToNumber(request.provinceId, true),
					municipalityId: NumberUtils.convertToNumber(request.municipalityId, true),
					createdById
				},
				uploader
			)

			if (createdSupplier == 'emailInUse') {
				return forbidden(new EmailInUseError())
			}
			return ok(createdSupplier)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
