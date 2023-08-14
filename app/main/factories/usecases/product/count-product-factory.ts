import { DbCountProduct } from '@/app/data/usecases'
import { ProductPrismaRepository } from '@/app/infra/db'

export const makeCountProduct = () => {
	return new DbCountProduct(new ProductPrismaRepository())
}
