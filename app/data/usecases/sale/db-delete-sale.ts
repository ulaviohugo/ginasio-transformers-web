import { DeleteSale } from '@/app/domain/usecases'
import { SaleRepository } from '../../protocols'

export class DbDeleteSale implements DeleteSale {
	constructor(private readonly saleRepository: SaleRepository) {}

	async delete(i: number): Promise<boolean> {
		const foundSale = await this.saleRepository.findById(i)
		if (!foundSale) return null as any
		return this.saleRepository.delete(i)
	}
}