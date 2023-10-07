import { DeleteSupplier } from '@/domain/usecases'
import { FileUtils } from '@/utils'
import { SupplierRepository } from '@/data/protocols'
import { Uploader } from '@/data/protocols/services'

export class DbDeleteSupplier implements DeleteSupplier {
	constructor(private readonly supplierRepository: SupplierRepository) {}

	async delete(supplier_id: number, uploader?: Uploader): Promise<boolean> {
		const foundSupplier = await this.supplierRepository.findById(supplier_id)

		if (!foundSupplier) return null as any

		if (uploader && foundSupplier.photo) {
			const path = FileUtils.getUploadAbsolutePath(foundSupplier.photo)
			await uploader.delete(path)
		}
		return this.supplierRepository.delete(supplier_id)
	}
}
