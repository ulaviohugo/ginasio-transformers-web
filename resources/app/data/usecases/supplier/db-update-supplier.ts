import { UpdateSupplier } from '@/domain/usecases'
import { SupplierProductRepository, SupplierRepository } from '@/data/protocols'
import { SupplierModel, SupplierProductModel } from '@/domain/models'
import { ArrayUtils, FileUtils, ObjectUtils } from '@/utils'
import { Uploader } from '@/data/protocols/services'

export class DbUpdateSupplier implements UpdateSupplier {
	constructor(
		private readonly supplierRepository: SupplierRepository,
		private readonly supplierProductRepository: SupplierProductRepository
	) {}

	async update(
		param: SupplierModel,
		uploader?: Uploader
	): Promise<SupplierModel | 'notFound' | 'emailInUse'> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.supplierRepository.findById(data.id)
		if (!foundById) return 'notFound'

		const exists = await this.supplierRepository.findByEmail(data.email)
		if (exists && exists.id !== data.id) return 'emailInUse'

		let photo
		if (uploader) {
			if (foundById.photo) {
				const path = FileUtils.getUploadAbsolutePath(foundById.photo)
				await uploader.delete(path)
			}
			photo = await uploader.upload()
		}

		const supplier: SupplierModel = {
			...data,
			photo,
			updated_at: new Date()
		}
		const updatedSupplier = await this.supplierRepository.update(supplier)
		let supplierProducts: SupplierProductModel[] = []
		if (updatedSupplier && param.supplier_products?.length) {
			for (let i = 0; i < param.supplier_products.length; i++) {
				const element = param.supplier_products[i]
				const item = await this.supplierProductRepository.addOrUpdate(element)
				supplierProducts.push(item)
			}
		}

		supplierProducts = ArrayUtils.removeDuplicated<SupplierProductModel>(
			[...supplierProducts, ...(updatedSupplier.supplier_products || [])],
			'id'
		)

		return { ...updatedSupplier, supplier_products: supplierProducts }
	}
}
