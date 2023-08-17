import { DbCountSupplier } from '@/app/data/usecases'
import { SupplierPrismaRepository } from '@/app/infra/db'

export const makeCountSupplier = () => {
	return new DbCountSupplier(new SupplierPrismaRepository())
}
