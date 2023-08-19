import { DbAddSale } from '@/app/data/usecases'
import { SalePrismaRepository } from '@/app/infra/db'

export const makeAddSale = () => {
	return new DbAddSale(new SalePrismaRepository())
}
