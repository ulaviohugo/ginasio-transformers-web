import { AddInsured, AddInsuredsResult } from '@/domain/usecases'
import { InsuredRepository } from '@/data/protocols'
import { InsuredModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'

export class DbAddInsured implements AddInsured {
	constructor(private readonly insuredRepository: InsuredRepository) {}
	async add(param: InsuredModel): Promise<AddInsuredsResult> {
		const data = ObjectUtils.trimValues(param)

		const foundByDoc = await this.insuredRepository.findByDocument(
			data.document_type,
			data.document_number
		)
		if (foundByDoc) return 'documentInUse'

		const createdInsured = await this.insuredRepository.add(data)

		return createdInsured
	}
}
