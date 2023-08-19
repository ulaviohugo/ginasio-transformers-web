import { AddSale, AddSalesResult } from '@/app/domain/usecases'
import { SaleRepository } from '../../protocols'
import { Sale } from '../../../domain/models'
import { ObjectUtils } from '@/app/utils'

export class DbAddSale implements AddSale {
	constructor(private readonly saleRepository: SaleRepository) {}
	async add(param: Sale): Promise<AddSalesResult> {
		const data = ObjectUtils.trimValues(param)
		return this.saleRepository.add(data)
	}
}
