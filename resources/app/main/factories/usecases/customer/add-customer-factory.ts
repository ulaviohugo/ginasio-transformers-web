import { DbAddCustomer } from '@/data/usecases'
import { CustomerPrismaRepository } from '@/infra/db'

export const makeAddCustomer = () => {
	return new DbAddCustomer(new CustomerPrismaRepository())
}
