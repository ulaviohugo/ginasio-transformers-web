import { Product } from '@/app/domain/models'

export interface ProductRepository {
	add(param: Product): Promise<Product>
	findByName(name: string): Promise<Product | null>
	findByNameAndCategoryId(name: string, categoryId: number): Promise<Product | null>
	findById(productId: number): Promise<Product | null>
	loadAll(): Promise<Product[]>
	update(param: Product): Promise<Product>
	delete(productId: number): Promise<boolean>
	count(): Promise<number>
}
