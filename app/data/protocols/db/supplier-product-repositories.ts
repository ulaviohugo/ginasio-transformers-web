import { SupplierProductModel } from '@/app/domain/models'

export type SupplierProductFindDuplicatedParam = {
	supplierId: number
	categoryId: number
	productId: number
}

export interface SupplierProductRepository {
	add(param: SupplierProductModel): Promise<SupplierProductModel>
	findById(supplierId: number): Promise<SupplierProductModel | null>
	findDuplicated({
		supplierId,
		categoryId,
		productId
	}: SupplierProductFindDuplicatedParam): Promise<SupplierProductModel | null>
	loadAll(): Promise<SupplierProductModel[]>
	update(param: SupplierProductModel): Promise<SupplierProductModel>
	addOrUpdate(param: SupplierProductModel): Promise<SupplierProductModel>
	delete(supplierId: number): Promise<boolean>
	count(): Promise<number>
}
