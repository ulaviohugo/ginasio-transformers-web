import { UpdateProduct } from '@/app/domain/usecases'
import { ProductRepository } from '../../protocols'
import { Product } from '../../../domain/models'
import { FileUtils, ObjectUtils } from '@/app/utils'
import { Uploader } from '../../protocols/services'

export class DbUpdateProduct implements UpdateProduct {
	constructor(private readonly productRepository: ProductRepository) {}

	async update(param: Product, uploader?: Uploader): Promise<Product> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.productRepository.findById(data.id)
		if (!foundById) return null as any

		let image
		if (uploader) {
			if (foundById.image) {
				const path = FileUtils.getUploadAbsolutePath(foundById.image)
				await uploader.delete(path)
			}
			image = await uploader.upload()
		}

		const product: Product = {
			...data,
			image,
			updatedAt: new Date()
		}
		return this.productRepository.update(product)
	}
}
