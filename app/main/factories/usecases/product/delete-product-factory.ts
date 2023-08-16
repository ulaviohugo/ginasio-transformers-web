import { DbDeleteProduct } from '@/app/data/usecases'
import { ProductPrismaRepository } from '@/app/infra/db'

export const makeDeleteProduct = () => {
	return new DbDeleteProduct(new ProductPrismaRepository())
}
