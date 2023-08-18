import { CountSupplier } from '@/app/domain/usecases'
import { SupplierRepository } from '../../protocols'

export class DbCountSupplier implements CountSupplier {
	constructor(private readonly supplierRepository: SupplierRepository) {}

	async count(): Promise<number> {
		return await this.supplierRepository.count()
	}
}