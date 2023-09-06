import { ProductModel } from '@/domain/models'

export interface ProductRepository {
	add(param: ProductModel): Promise<ProductModel>
	findByName(name: string): Promise<ProductModel | null>
	findByNameAndCategoryId(name: string, categoryId: number): Promise<ProductModel | null>
	findById(productId: number): Promise<ProductModel | null>
	loadAll(): Promise<ProductModel[]>
	update(param: ProductModel): Promise<ProductModel>
	delete(productId: number): Promise<boolean>
	count(): Promise<number>
}
