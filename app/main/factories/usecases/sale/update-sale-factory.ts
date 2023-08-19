import { DbUpdateSale } from '@/app/data/usecases'
import { SalePrismaRepository } from '@/app/infra/db'

export const makeUpdateSale = () => {
	return new DbUpdateSale(new SalePrismaRepository())
}
