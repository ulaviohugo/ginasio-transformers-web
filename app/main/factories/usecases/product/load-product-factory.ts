import { DbLoadProducts } from '@/data/usecases'
import { ProductPrismaRepository } from '@/infra/db'

export const makeLoadProduct = () => {
	return new DbLoadProducts(new ProductPrismaRepository())
}
