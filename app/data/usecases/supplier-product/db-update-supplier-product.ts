import { UpdateSupplierProduct, UpdateSupplierProductResult } from '@/app/domain/usecases'
import { SupplierProductRepository } from '../../protocols'
import { SupplierProduct } from '../../../domain/models'
import { ObjectUtils } from '@/app/utils'

export class DbUpdateSupplierProduct implements UpdateSupplierProduct {
	constructor(private readonly supplierRepository: SupplierProductRepository) {}
	async update(param: SupplierProduct): Promise<UpdateSupplierProductResult> {
		const data = ObjectUtils.trimValues(param)
		const { supplierId, categoryId, productId } = param
		const found = await this.supplierRepository.findDuplicated({
			supplierId,
			categoryId,
			productId
		})

		if (!found) {
			return null as any
		}

		return this.supplierRepository.update(data)
	}
}
