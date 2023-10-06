import { DbUpdateEmployee } from '@/data/usecases'
import { BcryptAdapter } from '@/infra/cryptography'
import { EmployeePrismaRepository } from '@/infra/db'

export const makeUpdateEmployee = () => {
	return new DbUpdateEmployee(new EmployeePrismaRepository(), new BcryptAdapter())
}
