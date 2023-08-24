import { SupplierProduct } from '@/app/domain/models'

export type SupplierProductFindDuplicatedParam = {
	supplierId: number
	categoryId: number
	productId: number
}

export interface SupplierProductRepository {
	add(param: SupplierProduct): Promise<SupplierProduct>
	findById(supplierId: number): Promise<SupplierProduct | null>
	findDuplicated({
		supplierId,
		categoryId,
		productId
	}: SupplierProductFindDuplicatedParam): Promise<SupplierProduct | null>
	loadAll(): Promise<SupplierProduct[]>
	update(param: SupplierProduct): Promise<SupplierProduct>
	addOrUpdate(param: SupplierProduct): Promise<SupplierProduct>
	delete(supplierId: number): Promise<boolean>
	count(): Promise<number>
}
