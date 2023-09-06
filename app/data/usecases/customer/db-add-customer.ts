import { AddCustomer, AddCustomersResult } from '@/domain/usecases'
import { CustomerRepository } from '@/data/protocols'
import { CustomerModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'
import { Uploader } from '@/data/protocols/services'

export class DbAddCustomer implements AddCustomer {
	constructor(private readonly employeeRepository: CustomerRepository) {}
	async add(param: CustomerModel, uploader?: Uploader): Promise<AddCustomersResult> {
		const data = ObjectUtils.trimValues(param)

		const exists = data.email && (await this.employeeRepository.findByEmail(data.email))
		if (exists) return 'emailInUse'
		let image
		if (uploader) {
			image = await uploader.upload()
		}

		const createdCustomer = await this.employeeRepository.add({
			...data,
			photo: image
		})

		return createdCustomer
	}
}
