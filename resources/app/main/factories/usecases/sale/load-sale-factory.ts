import { DbLoadSale } from '@/data/usecases'
import { SalePrismaRepository } from '@/infra/db'

export const makeLoadSale = () => {
	return new DbLoadSale(new SalePrismaRepository())
}
