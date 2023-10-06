import { CountInsured } from '@/domain/usecases'
import { InsuredRepository } from '@/data/protocols'

export class DbCountInsured implements CountInsured {
	constructor(private readonly insuredRepository: InsuredRepository) {}

	async count(): Promise<number> {
		return await this.insuredRepository.count()
	}
}
