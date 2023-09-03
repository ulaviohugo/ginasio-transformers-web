import { DbLoadCurrentUser } from '@/app/data/usecases'
import { EmployeePrismaRepository } from '@/app/infra/db'

export const makeLoadCurrentUser = () => {
	return new DbLoadCurrentUser(new EmployeePrismaRepository())
}
