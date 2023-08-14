import { AddProduct } from '@/app/domain/usecases'
import { ProductRepository } from '../../protocols'
import { Product } from '../../../domain/models'
import { ObjectUtils } from '@/app/utils'
import { Uploader } from '../../protocols/services'

export class DbAddProduct implements AddProduct {
	constructor(private readonly productRepository: ProductRepository) {}
	async add(param: Product, uploader?: Uploader): Promise<Product> {
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
		return this.productRepository.add({ ...data, image })
	}
}
