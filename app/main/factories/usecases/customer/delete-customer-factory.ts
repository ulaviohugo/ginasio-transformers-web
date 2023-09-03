import { DbDeleteCustomer } from '@/app/data/usecases'
import { CustomerPrismaRepository } from '@/app/infra/db'

export const makeDeleteCustomer = () => {
	return new DbDeleteCustomer(new CustomerPrismaRepository())
}
