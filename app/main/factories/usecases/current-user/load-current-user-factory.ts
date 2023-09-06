import { DbLoadCurrentUser } from '@/data/usecases'
import { EmployeePrismaRepository } from '@/infra/db'

export const makeLoadCurrentUser = () => {
	return new DbLoadCurrentUser(new EmployeePrismaRepository())
}
