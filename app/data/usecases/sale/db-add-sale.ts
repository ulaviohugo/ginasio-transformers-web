import { AddSale, AddSalesResult } from '@/domain/usecases'
import { SaleRepository } from '../../protocols'
import { SaleModel } from '../../../domain/models'
import { ObjectUtils } from '@/utils'

export class DbAddSale implements AddSale {
	constructor(private readonly saleRepository: SaleRepository) {}
	async add(param: SaleModel): Promise<AddSalesResult> {
		const data = ObjectUtils.trimValues(param)
		return this.saleRepository.add(data)
	}
}
