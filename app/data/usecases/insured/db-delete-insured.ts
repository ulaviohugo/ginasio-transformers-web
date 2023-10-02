import { DeleteInsured } from '@/domain/usecases'
import { FileUtils } from '@/utils'
import { InsuredRepository } from '@/data/protocols'
import { Uploader } from '@/data/protocols/services'

export class DbDeleteInsured implements DeleteInsured {
	constructor(private readonly insuredRepository: InsuredRepository) {}

	async delete(insuredId: number, uploader?: Uploader): Promise<boolean> {
		const foundInsured = await this.insuredRepository.findById(insuredId)

		if (!foundInsured) return null as any

		return this.insuredRepository.delete(insuredId)
	}
}
