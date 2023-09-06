import { AddProduct } from '@/domain/usecases'
import { ProductRepository } from '../../protocols'
import { ProductModel } from '@/domain/models'
import { NumberUtils, ObjectUtils } from '@/utils'
import { Uploader } from '../../protocols/services'

export class DbAddProduct implements AddProduct {
	constructor(private readonly productRepository: ProductRepository) {}
	async add(param: ProductModel, uploader?: Uploader): Promise<ProductModel> {
		const data = ObjectUtils.trimValues(param)

		const exists = await this.productRepository.findByNameAndCategoryId(
			data.name,
			data.categoryId
		)
		if (exists) return null as any

		let image
		if (uploader) {
			image = await uploader.upload()
		}
		return this.productRepository.add({
			...data,
			price: NumberUtils.convertToNumber(param.price),
			photo: image
		})
	}
}
