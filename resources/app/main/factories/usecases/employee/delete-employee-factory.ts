import { DbDeleteEmployee } from '@/data/usecases'
import { EmployeePrismaRepository } from '@/infra/db'

export const makeDeleteEmployee = () => {
	return new DbDeleteEmployee(new EmployeePrismaRepository())
}
