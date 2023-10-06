import { DbUpdateSupplier } from '@/data/usecases'
import { SupplierPrismaRepository, SupplierProductPrismaRepository } from '@/infra/db'

export const makeUpdateSupplier = () => {
	return new DbUpdateSupplier(
		new SupplierPrismaRepository(),
		new SupplierProductPrismaRepository()
	)
}
