import { AddSupplier, AddSuppliersResult } from '@/app/domain/usecases'
import { SupplierRepository } from '../../protocols'
import { Supplier } from '../../../domain/models'
import { ObjectUtils } from '@/app/utils'
import { Uploader } from '../../protocols/services'

export class DbAddSupplier implements AddSupplier {
	constructor(private readonly supplierRepository: SupplierRepository) {}
	async add(param: Supplier, uploader?: Uploader): Promise<AddSuppliersResult> {
		const data = ObjectUtils.trimValues(param)

		const exists = await this.supplierRepository.findByEmail(data.email)
		if (exists && exists.id !== data.id) return 'emailInUse'

		let photo
		if (uploader) {
			photo = await uploader.upload()
		}
		return this.supplierRepository.add({ ...data, photo })
	}
}
