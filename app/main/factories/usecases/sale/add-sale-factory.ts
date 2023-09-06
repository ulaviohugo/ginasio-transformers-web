import { DbAddSale } from '@/data/usecases'
import { SalePrismaRepository } from '@/infra/db'

export const makeAddSale = () => {
	return new DbAddSale(new SalePrismaRepository())
}
