import { DbUpdateSupplier } from '@/app/data/usecases'
import { SupplierPrismaRepository, SupplierProductPrismaRepository } from '@/app/infra/db'

export const makeUpdateSupplier = () => {
	return new DbUpdateSupplier(
		new SupplierPrismaRepository(),
		new SupplierProductPrismaRepository()
	)
}
