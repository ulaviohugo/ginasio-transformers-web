import { CountSale } from '@/domain/usecases'
import { SaleRepository } from '../../protocols'

export class DbCountSale implements CountSale {
	constructor(private readonly saleRepository: SaleRepository) {}

	async count(): Promise<number> {
		return await this.saleRepository.count()
	}
}
