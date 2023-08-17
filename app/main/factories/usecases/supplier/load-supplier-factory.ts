import { DbLoadSuppliers } from '@/app/data/usecases'
import { SupplierPrismaRepository } from '@/app/infra/db'

export const makeLoadSupplier = () => {
	return new DbLoadSuppliers(new SupplierPrismaRepository())
}
