import { ProductModel } from '@/domain/models'

export interface ProductRepository {
	add(param: ProductModel): Promise<ProductModel>
	findByName(name: string): Promise<ProductModel | null>
	findByNameAndCategoryId(name: string, category_id: number): Promise<ProductModel | null>
	findById(product_id: number): Promise<ProductModel | null>
	loadAll(): Promise<ProductModel[]>
	update(param: ProductModel): Promise<ProductModel>
	delete(product_id: number): Promise<boolean>
	count(): Promise<number>
}
