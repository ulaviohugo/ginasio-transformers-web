import { DbLoadEmployees } from '@/data/usecases'
import { EmployeePrismaRepository } from '@/infra/db'

export const makeLoadEmployee = () => {
	return new DbLoadEmployees(new EmployeePrismaRepository())
}
