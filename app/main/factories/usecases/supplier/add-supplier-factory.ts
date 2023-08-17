import { DbAddSupplier } from '@/app/data/usecases'
import { SupplierPrismaRepository } from '@/app/infra/db'

export const makeAddSupplier = () => {
	return new DbAddSupplier(new SupplierPrismaRepository())
}
