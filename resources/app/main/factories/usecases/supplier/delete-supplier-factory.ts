import { DbDeleteSupplier } from '@/data/usecases'
import { SupplierPrismaRepository } from '@/infra/db'

export const makeDeleteSupplier = () => {
	return new DbDeleteSupplier(new SupplierPrismaRepository())
}
