import { DbAddProduct } from '@/data/usecases'
import { ProductPrismaRepository } from '@/infra/db'

export const makeAddProduct = () => {
	return new DbAddProduct(new ProductPrismaRepository())
}
