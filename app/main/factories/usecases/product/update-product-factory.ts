import { DbUpdateProduct } from '@/app/data/usecases'
import { ProductPrismaRepository } from '@/app/infra/db'

export const makeUpdateProduct = () => {
	return new DbUpdateProduct(new ProductPrismaRepository())
}
