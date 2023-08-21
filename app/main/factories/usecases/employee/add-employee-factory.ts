import { DbAddEmployee } from '@/app/data/usecases'
import { BcryptAdapter } from '@/app/infra/cryptography'
import { EmployeePrismaRepository } from '@/app/infra/db'

export const makeAddEmployee = () => {
	return new DbAddEmployee(new EmployeePrismaRepository(), new BcryptAdapter())
}
