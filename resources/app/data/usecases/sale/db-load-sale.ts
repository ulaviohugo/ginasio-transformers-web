import { LoadSales, LoadSalesResult } from '@/domain/usecases'
import { QueryParams, SaleRepository } from '@/data/protocols'
import { SaleModel } from '@/domain/models'

export class DbLoadSale implements LoadSales {
	constructor(private readonly saleRepository: SaleRepository) {}
	async load(queryParams?: QueryParams<SaleModel>): Promise<LoadSalesResult> {
		return this.saleRepository.loadAll(queryParams)
	}
}
