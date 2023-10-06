import { DbDeleteProduct } from '@/data/usecases'
import { ProductPrismaRepository } from '@/infra/db'

export const makeDeleteProduct = () => {
	return new DbDeleteProduct(new ProductPrismaRepository())
}
