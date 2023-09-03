import { DbUpdateCustomer } from '@/app/data/usecases'
import { BcryptAdapter } from '@/app/infra/cryptography'
import { CustomerPrismaRepository } from '@/app/infra/db'

export const makeUpdateCustomer = () => {
	return new DbUpdateCustomer(new CustomerPrismaRepository())
}
