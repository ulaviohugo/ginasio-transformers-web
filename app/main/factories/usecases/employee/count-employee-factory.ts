import { DbCountEmployee } from '@/app/data/usecases'
import { EmployeePrismaRepository } from '@/app/infra/db'

export const makeCountEmployee = () => {
	return new DbCountEmployee(new EmployeePrismaRepository())
}
