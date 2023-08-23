import { AddSupplier } from '@/app/domain/usecases'
import { EmailInUseError } from '../../errors'
import { badRequest, forbidden, ok, serverError } from '../../helper'
import { Controller, ControllerParams, Validation } from '../../protocols'
import { Supplier, SupplierProduct } from '@/app/domain/models'
import { NumberUtils } from '@/app/utils'
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

			let uploader: Uploader = null as any
			if (request.photo && typeof request.photo != 'string') {
				uploader = new UploadService(request.photo, '/suppliers')
			}
			const createdById = NumberUtils.convertToNumber(request.accountId)

			let supplierProducts: SupplierProduct[] =
				typeof request.supplierProducts == 'string'
					? JSON.parse(request.supplierProducts)
					: request.supplierProducts

			supplierProducts = supplierProducts.map((sp) => ({
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
