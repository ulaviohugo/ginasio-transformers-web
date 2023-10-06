import { DbUpdateProduct } from '@/data/usecases'
import { ProductPrismaRepository } from '@/infra/db'

export const makeUpdateProduct = () => {
	return new DbUpdateProduct(new ProductPrismaRepository())
}
