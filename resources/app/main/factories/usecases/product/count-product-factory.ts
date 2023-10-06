import { DbCountProduct } from '@/data/usecases'
import { ProductPrismaRepository } from '@/infra/db'

export const makeCountProduct = () => {
	return new DbCountProduct(new ProductPrismaRepository())
}
