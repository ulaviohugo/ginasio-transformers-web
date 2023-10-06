import { DbDeleteSale } from '@/data/usecases'
import { SalePrismaRepository } from '@/infra/db'

export const makeDeleteSale = () => {
	return new DbDeleteSale(new SalePrismaRepository())
}
