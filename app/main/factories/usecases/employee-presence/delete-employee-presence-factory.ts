import { DbDeleteEmployeePresence } from '@/data/usecases'
import { EmployeePresencePrismaRepository } from '@/infra/db'

export const makeDeleteEmployeePresence = () => {
	return new DbDeleteEmployeePresence(new EmployeePresencePrismaRepository())
}
