import { DbCountCustomer } from '@/data/usecases'
import { CustomerPrismaRepository } from '@/infra/db'

export const makeCountCustomer = () => {
	return new DbCountCustomer(new CustomerPrismaRepository())
}
