import { DeleteSupplier } from '@/app/domain/usecases'
import { FileUtils } from '@/app/utils'
import { SupplierRepository } from '../../protocols'
import { Uploader } from '../../protocols/services'

export class DbDeleteSupplier implements DeleteSupplier {
	constructor(private readonly supplierRepository: SupplierRepository) {}

	async delete(supplierId: number, uploader?: Uploader): Promise<boolean> {
		const foundSupplier = await this.supplierRepository.findById(supplierId)

		if (!foundSupplier) return null as any

		if (uploader && foundSupplier.photo) {
			const path = FileUtils.getUploadAbsolutePath(foundSupplier.photo)
			await uploader.delete(path)
		}
		return this.supplierRepository.delete(supplierId)
	}
}
