import { UpdateSale } from '@/domain/usecases'
import { SaleRepository } from '@/data/protocols'
import { SaleModel } from '@/domain/models'
import { FileUtils, ObjectUtils } from '@/utils'

export class DbUpdateSale implements UpdateSale {
	constructor(private readonly saleRepository: SaleRepository) {}

	async update(param: SaleModel): Promise<SaleModel | 'notFound'> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.saleRepository.findById(data.id)
		if (!foundById) return 'notFound'

		const sale: SaleModel = {
			...data,
			updatedAt: new Date()
		}
		return this.saleRepository.update(sale)
	}
}
