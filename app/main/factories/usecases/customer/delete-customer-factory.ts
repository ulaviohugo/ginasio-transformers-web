import { DbDeleteCustomer } from '@/data/usecases'
import { CustomerPrismaRepository } from '@/infra/db'

export const makeDeleteCustomer = () => {
	return new DbDeleteCustomer(new CustomerPrismaRepository())
}
