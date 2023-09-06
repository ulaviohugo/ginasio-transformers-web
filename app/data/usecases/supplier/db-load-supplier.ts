import { LoadSuppliers, LoadSuppliersResult } from '@/domain/usecases'
import { SupplierRepository } from '@/data/protocols'

export class DbLoadSuppliers implements LoadSuppliers {
	constructor(private readonly supplierRepository: SupplierRepository) {}
	async load(): Promise<LoadSuppliersResult> {
		return this.supplierRepository.loadAll()
	}
}
