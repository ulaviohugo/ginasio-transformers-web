import { DbAddEmployee } from '@/data/usecases'
import { BcryptAdapter } from '@/infra/cryptography'
import { EmployeePrismaRepository } from '@/infra/db'

export const makeAddEmployee = () => {
	return new DbAddEmployee(new EmployeePrismaRepository(), new BcryptAdapter())
}
