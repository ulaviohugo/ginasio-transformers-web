import { AddSupplierProduct, AddSupplierProductResult } from '@/domain/usecases'
import { SupplierProductRepository } from '@/data/protocols'
import { SupplierProductModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'

export class DbAddSupplierProduct implements AddSupplierProduct {
	constructor(private readonly supplierRepository: SupplierProductRepository) {}
	async add(param: SupplierProductModel): Promise<AddSupplierProductResult> {
		const data = ObjectUtils.trimValues(param)
		const { supplierId, categoryId, productId } = param
		const found = await this.supplierRepository.findDuplicated({
			supplierId,
			categoryId,
			productId
		})

		if (found) {
			return null as any
		}

		return this.supplierRepository.add(data)
	}
}
