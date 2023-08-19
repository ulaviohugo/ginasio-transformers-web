import { DbLoadSale } from '@/app/data/usecases'
import { SalePrismaRepository } from '@/app/infra/db'

export const makeLoadSale = () => {
	return new DbLoadSale(new SalePrismaRepository())
}
