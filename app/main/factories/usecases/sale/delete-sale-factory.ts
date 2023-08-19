import { DbDeleteSale } from '@/app/data/usecases'
import { SalePrismaRepository } from '@/app/infra/db'

export const makeDeleteSale = () => {
	return new DbDeleteSale(new SalePrismaRepository())
}
