import { DbLoadCustomers } from '@/app/data/usecases'
import { CustomerPrismaRepository } from '@/app/infra/db'

export const makeLoadCustomer = () => {
	return new DbLoadCustomers(new CustomerPrismaRepository())
}
