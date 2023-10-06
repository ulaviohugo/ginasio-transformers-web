import { DbCountSale } from '@/data/usecases'
import { SalePrismaRepository } from '@/infra/db'

export const makeCountSale = () => {
	return new DbCountSale(new SalePrismaRepository())
}
