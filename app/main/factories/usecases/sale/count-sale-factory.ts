import { DbCountSale } from '@/app/data/usecases'
import { SalePrismaRepository } from '@/app/infra/db'

export const makeCountSale = () => {
	return new DbCountSale(new SalePrismaRepository())
}
