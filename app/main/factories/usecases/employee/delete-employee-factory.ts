import { DbDeleteEmployee } from '@/app/data/usecases'
import { EmployeePrismaRepository } from '@/app/infra/db'

export const makeDeleteEmployee = () => {
	return new DbDeleteEmployee(new EmployeePrismaRepository())
}
