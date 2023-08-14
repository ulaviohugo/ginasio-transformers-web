import { DbAddProduct } from '@/app/data/usecases'
import { ProductPrismaRepository } from '@/app/infra/db'

export const makeAddProduct = () => {
	return new DbAddProduct(new ProductPrismaRepository())
}
