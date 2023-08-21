import { DbUpdateEmployee } from '@/app/data/usecases'
import { BcryptAdapter } from '@/app/infra/cryptography'
import { EmployeePrismaRepository } from '@/app/infra/db'

export const makeUpdateEmployee = () => {
	return new DbUpdateEmployee(new EmployeePrismaRepository(), new BcryptAdapter())
}
