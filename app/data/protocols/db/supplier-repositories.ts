import { SupplierModel } from '@/domain/models'

export interface SupplierRepository {
	add(param: SupplierModel): Promise<SupplierModel>
	findByEmail(email: string): Promise<SupplierModel | null>
	findById(supplierId: number): Promise<SupplierModel | null>
	loadAll(): Promise<SupplierModel[]>
	update(param: SupplierModel): Promise<SupplierModel>
	delete(supplierId: number): Promise<boolean>
	count(): Promise<number>
}
