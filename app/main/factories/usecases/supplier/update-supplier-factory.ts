import { DbUpdateSupplier } from '@/app/data/usecases'
import { SupplierPrismaRepository } from '@/app/infra/db'

export const makeUpdateSupplier = () => {
	return new DbUpdateSupplier(new SupplierPrismaRepository())
}
