import { LoadInsureds, LoadInsuredsResult } from '@/domain/usecases'
import { InsuredRepository } from '@/data/protocols'

export class DbLoadInsureds implements LoadInsureds {
	constructor(private readonly insuredRepository: InsuredRepository) {}
	async load(): Promise<LoadInsuredsResult> {
		return this.insuredRepository.loadAll()
	}
}
