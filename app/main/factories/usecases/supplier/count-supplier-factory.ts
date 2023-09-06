import { DbCountSupplier } from '@/data/usecases'
import { SupplierPrismaRepository } from '@/infra/db'

export const makeCountSupplier = () => {
	return new DbCountSupplier(new SupplierPrismaRepository())
}
