import { DbAddEmployeePresence } from '@/data/usecases'
import { EmployeePresencePrismaRepository } from '@/infra/db'

export const makeAddEmployeePresence = () => {
	return new DbAddEmployeePresence(new EmployeePresencePrismaRepository())
}
