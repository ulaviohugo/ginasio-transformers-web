import { DbLoadProducts } from '@/app/data/usecases'
import { ProductPrismaRepository } from '@/app/infra/db'

export const makeLoadProduct = () => {
	return new DbLoadProducts(new ProductPrismaRepository())
}
