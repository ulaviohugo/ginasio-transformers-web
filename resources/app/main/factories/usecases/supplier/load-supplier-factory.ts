import { DbLoadSuppliers } from '@/data/usecases'
import { SupplierPrismaRepository } from '@/infra/db'

export const makeLoadSupplier = () => {
	return new DbLoadSuppliers(new SupplierPrismaRepository())
}
