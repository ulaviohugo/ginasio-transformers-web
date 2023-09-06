import { LoadSales, LoadSalesResult } from '@/domain/usecases'
import { SaleRepository } from '../../protocols'

export class DbLoadSale implements LoadSales {
	constructor(private readonly saleRepository: SaleRepository) {}
	async load(): Promise<LoadSalesResult> {
		return this.saleRepository.loadAll()
	}
}
