import { DbCountEmployeePresence } from '@/data/usecases'
import { EmployeePresencePrismaRepository } from '@/infra/db'

export const makeCountEmployeePresence = () => {
	return new DbCountEmployeePresence(new EmployeePresencePrismaRepository())
}
