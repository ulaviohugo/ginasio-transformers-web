import { AddCustomer, AddCustomersResult } from '@/app/domain/usecases'
import { CustomerRepository } from '../../protocols'
import { CustomerModel } from '../../../domain/models'
import { ObjectUtils } from '@/app/utils'
import { Uploader } from '../../protocols/services'

export class DbAddCustomer implements AddCustomer {
	constructor(private readonly employeeRepository: CustomerRepository) {}
	async add(param: CustomerModel, uploader?: Uploader): Promise<AddCustomersResult> {
		const data = ObjectUtils.trimValues(param)

		const exists = await this.employeeRepository.findByEmail(data.email)
		if (exists && exists.id !== data.id) return 'emailInUse'
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
