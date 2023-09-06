import { UpdateSupplierProduct, UpdateSupplierProductResult } from '@/domain/usecases'
import { SupplierProductRepository } from '../../protocols'
import { SupplierProductModel } from '../../../domain/models'
import { ObjectUtils } from '@/utils'

export class DbUpdateSupplierProduct implements UpdateSupplierProduct {
	constructor(private readonly supplierRepository: SupplierProductRepository) {}
	async update(param: SupplierProductModel): Promise<UpdateSupplierProductResult> {
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
