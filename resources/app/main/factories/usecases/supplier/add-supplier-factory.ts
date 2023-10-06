import { DbAddSupplier } from '@/data/usecases'
import { SupplierPrismaRepository } from '@/infra/db'

export const makeAddSupplier = () => {
	return new DbAddSupplier(new SupplierPrismaRepository())
}
