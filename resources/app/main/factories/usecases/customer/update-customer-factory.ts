import { DbUpdateCustomer } from '@/data/usecases'
import { BcryptAdapter } from '@/infra/cryptography'
import { CustomerPrismaRepository } from '@/infra/db'

export const makeUpdateCustomer = () => {
	return new DbUpdateCustomer(new CustomerPrismaRepository())
}
