import { CountSupplier } from '@/domain/usecases'
import { SupplierRepository } from '@/data/protocols'

export class DbCountSupplier implements CountSupplier {
	constructor(private readonly supplierRepository: SupplierRepository) {}

	async count(): Promise<number> {
		return await this.supplierRepository.count()
	}
}
