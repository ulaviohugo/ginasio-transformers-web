import { DbCountCustomer } from '@/app/data/usecases'
import { CustomerPrismaRepository } from '@/app/infra/db'

export const makeCountCustomer = () => {
	return new DbCountCustomer(new CustomerPrismaRepository())
}
