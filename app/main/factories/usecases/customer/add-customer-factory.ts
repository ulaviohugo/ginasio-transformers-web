import { DbAddCustomer } from '@/app/data/usecases'
import { CustomerPrismaRepository } from '@/app/infra/db'

export const makeAddCustomer = () => {
	return new DbAddCustomer(new CustomerPrismaRepository())
}
