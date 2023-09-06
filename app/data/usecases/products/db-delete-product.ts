import { DeleteProduct } from '@/domain/usecases'
import { FileUtils } from '@/utils'
import { ProductRepository } from '@/data/protocols'
import { Uploader } from '@/data/protocols/services'

export class DbDeleteProduct implements DeleteProduct {
	constructor(private readonly employeeRepository: ProductRepository) {}

	async delete(employeeId: number, uploader?: Uploader): Promise<boolean> {
		const foundProduct = await this.employeeRepository.findById(employeeId)

		if (!foundProduct) return null as any

		if (uploader && foundProduct.photo) {
			const path = FileUtils.getUploadAbsolutePath(foundProduct.photo)
			await uploader.delete(path)
		}
		return this.employeeRepository.delete(employeeId)
	}
}
