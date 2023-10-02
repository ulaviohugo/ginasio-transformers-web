import { UpdateInsured } from '@/domain/usecases'
import { InsuredRepository } from '@/data/protocols'
import { InsuredModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'

export class DbUpdateInsured implements UpdateInsured {
	constructor(private readonly insuredRepository: InsuredRepository) {}

	async update(
		param: InsuredModel
	): Promise<InsuredModel | 'notFound' | 'emailInUse' | 'documentInUse'> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.insuredRepository.findById(data.id)
		if (!foundById) return 'notFound'

		const exists = await this.insuredRepository.findByEmail(data.email)
		if (exists && exists.id !== data.id) return 'emailInUse'

		const foundByDoc = await this.insuredRepository.findByDocument(
			data.documentType,
			data.documentNumber
		)
		if (foundByDoc && foundByDoc.id !== data.id) return 'documentInUse'

		const updatedInsured = await this.insuredRepository.update({
			...data,
			updatedAt: new Date()
		})

		return updatedInsured
	}
}
