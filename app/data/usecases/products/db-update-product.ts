import { UpdateProduct } from '@/app/domain/usecases'
import { ProductRepository } from '../../protocols'
import { Product } from '../../../domain/models'
import { FileUtils, NumberUtils, ObjectUtils } from '@/app/utils'
import { Uploader } from '../../protocols/services'

export class DbUpdateProduct implements UpdateProduct {
	constructor(private readonly productRepository: ProductRepository) {}

	async update(param: Product, uploader?: Uploader): Promise<Product> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.productRepository.findById(data.id)
		if (!foundById) return null as any

		let image
		if (uploader) {
			if (foundById.photo) {
				const path = FileUtils.getUploadAbsolutePath(foundById.photo)
				await uploader.delete(path)
			}
			image = await uploader.upload()
		}

		const product: Product = {
			...data,
			photo: image,
			price: NumberUtils.convertToNumber(param.price),
			updatedAt: new Date()
		}
		return this.productRepository.update(product)
	}
}
