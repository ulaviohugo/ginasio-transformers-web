import { UpdateProduct } from '@/domain/usecases'
import { ProductRepository } from '../../protocols'
import { ProductModel } from '../../../domain/models'
import { FileUtils, NumberUtils, ObjectUtils } from '@/utils'
import { Uploader } from '../../protocols/services'

export class DbUpdateProduct implements UpdateProduct {
	constructor(private readonly productRepository: ProductRepository) {}

	async update(param: ProductModel, uploader?: Uploader): Promise<ProductModel> {
		const data = ObjectUtils.trimValues(param)

		const foundById = await this.productRepository.findById(data.id)
		if (!foundById) return null as any

		const exists = await this.productRepository.findByNameAndCategoryId(
			data.name,
			data.categoryId
		)
		if (exists && exists.id !== data.id) return null as any

		let image
		if (uploader) {
			if (foundById.photo) {
				const path = FileUtils.getUploadAbsolutePath(foundById.photo)
				await uploader.delete(path)
			}
			image = await uploader.upload()
		}

		const product: ProductModel = {
			...data,
			photo: image,
			price: NumberUtils.convertToNumber(param.price),
			updatedAt: new Date()
		}
		return this.productRepository.update(product)
	}
}
