import { DbLoadCustomers } from '@/data/usecases'
import { CustomerPrismaRepository } from '@/infra/db'

export const makeLoadCustomer = () => {
	return new DbLoadCustomers(new CustomerPrismaRepository())
}
