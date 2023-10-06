import { DbUpdateSale } from '@/data/usecases'
import { SalePrismaRepository } from '@/infra/db'

export const makeUpdateSale = () => {
	return new DbUpdateSale(new SalePrismaRepository())
}
