import { DbUpdateEmployee } from '@/app/data/usecases'
import { EmployeePrismaRepository } from '@/app/infra/db'

export const makeUpdateEmployee = () => {
	return new DbUpdateEmployee(new EmployeePrismaRepository())
}
