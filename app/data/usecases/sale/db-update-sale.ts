import { UpdateSale } from '@/app/domain/usecases'
import { SaleRepository } from '../../protocols'
import { Sale } from '../../../domain/models'
import { FileUtils, ObjectUtils } from '@/app/utils'

export class DbUpdateSale implements UpdateSale {
	constructor(private readonly saleRepository: SaleRepository) {}

	async update(param: Sale): Promise<Sale | 'notFound'> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.saleRepository.findById(data.id)
		if (!foundById) return 'notFound'

		const sale: Sale = {
			...data,
			updatedAt: new Date()
		}
		return this.saleRepository.update(sale)
	}
}
