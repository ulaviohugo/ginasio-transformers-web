import { DbCountEmployee } from '@/data/usecases'
import { EmployeePrismaRepository } from '@/infra/db'

export const makeCountEmployee = () => {
	return new DbCountEmployee(new EmployeePrismaRepository())
}
