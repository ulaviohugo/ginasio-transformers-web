import { UpdateSupplierProduct, UpdateSupplierProductResult } from '@/domain/usecases'
import { SupplierProductRepository } from '@/data/protocols'
import { SupplierProductModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'

export class DbUpdateSupplierProduct implements UpdateSupplierProduct {
	constructor(private readonly supplierRepository: SupplierProductRepository) {}
	async update(param: SupplierProductModel): Promise<UpdateSupplierProductResult> {
		const data = ObjectUtils.trimValues(param)
		const { supplier_id, category_id, product_id } = param
		const found = await this.supplierRepository.findDuplicated({
			supplier_id,
			category_id,
			product_id
		})

		if (!found) {
			return null as any
		}

		return this.supplierRepository.update(data)
	}
}
