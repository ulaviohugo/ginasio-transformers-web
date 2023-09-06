import { DeleteCustomer } from '@/domain/usecases'
import { FileUtils } from '@/utils'
import { CustomerRepository } from '@/data/protocols'
import { Uploader } from '@/data/protocols/services'

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
