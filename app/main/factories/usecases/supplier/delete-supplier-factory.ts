import { DbDeleteSupplier } from '@/app/data/usecases'
import { SupplierPrismaRepository } from '@/app/infra/db'

export const makeDeleteSupplier = () => {
	return new DbDeleteSupplier(new SupplierPrismaRepository())
}
