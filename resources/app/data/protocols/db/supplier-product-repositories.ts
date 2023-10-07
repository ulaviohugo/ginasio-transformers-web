import { SupplierProductModel } from '@/domain/models'

export type SupplierProductFindDuplicatedParam = {
	supplier_id: number
	category_id: number
	product_id: number
}

export interface SupplierProductRepository {
	add(param: SupplierProductModel): Promise<SupplierProductModel>
	findById(supplier_id: number): Promise<SupplierProductModel | null>
	findDuplicated({
		supplier_id,
		category_id,
		product_id
	}: SupplierProductFindDuplicatedParam): Promise<SupplierProductModel | null>
	loadAll(): Promise<SupplierProductModel[]>
	update(param: SupplierProductModel): Promise<SupplierProductModel>
	addOrUpdate(param: SupplierProductModel): Promise<SupplierProductModel>
	delete(supplier_id: number): Promise<boolean>
	count(): Promise<number>
}
