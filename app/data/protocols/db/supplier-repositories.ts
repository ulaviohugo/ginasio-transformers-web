import { Supplier } from '@/app/domain/models'

export interface SupplierRepository {
	add(param: Supplier): Promise<Supplier>
	findByEmail(email: string): Promise<Supplier | null>
	findById(supplierId: number): Promise<Supplier | null>
	loadAll(): Promise<Supplier[]>
	update(param: Supplier): Promise<Supplier>
	delete(supplierId: number): Promise<boolean>
	count(): Promise<number>
}
