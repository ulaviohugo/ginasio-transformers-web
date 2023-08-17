import { LoadSuppliers, LoadSuppliersResult } from '@/app/domain/usecases'
import { SupplierRepository } from '../../protocols'

export class DbLoadSuppliers implements LoadSuppliers {
	constructor(private readonly supplierRepository: SupplierRepository) {}
	async load(): Promise<LoadSuppliersResult> {
		return this.supplierRepository.loadAll()
	}
}
