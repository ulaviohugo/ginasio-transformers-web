import { DeleteCustomer } from '@/app/domain/usecases'
import { FileUtils } from '@/app/utils'
import { CustomerRepository } from '../../protocols'
import { Uploader } from '../../protocols/services'

export class DbDeleteCustomer implements DeleteCustomer {
	constructor(private readonly employeeRepository: CustomerRepository) {}

	async delete(employeeId: number, uploader?: Uploader): Promise<boolean> {
		const foundCustomer = await this.employeeRepository.findById(employeeId)

		if (!foundCustomer) return null as any

		if (uploader && foundCustomer.photo) {
			const path = FileUtils.getUploadAbsolutePath(foundCustomer.photo)
			await uploader.delete(path)
		}
		return this.employeeRepository.delete(employeeId)
	}
}
