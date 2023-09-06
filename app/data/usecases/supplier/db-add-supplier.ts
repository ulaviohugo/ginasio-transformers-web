import { AddSupplier, AddSuppliersResult } from '@/domain/usecases'
import { SupplierRepository } from '../../protocols'
import { SupplierModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'
import { Uploader } from '../../protocols/services'

export class DbAddSupplier implements AddSupplier {
	constructor(private readonly supplierRepository: SupplierRepository) {}
	async add(param: SupplierModel, uploader?: Uploader): Promise<AddSuppliersResult> {
		const data = ObjectUtils.trimValues(param)

		const exists = await this.supplierRepository.findByEmail(data.email)
		if (exists) return 'emailInUse'

		let photo
		if (uploader) {
			photo = await uploader.upload()
		}
		return this.supplierRepository.add({ ...data, photo })
	}
}
