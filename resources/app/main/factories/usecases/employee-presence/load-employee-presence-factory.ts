import { DbLoadEmployeePresences } from '@/data/usecases'
import { EmployeePresencePrismaRepository } from '@/infra/db'

export const makeLoadEmployeePresence = () => {
	return new DbLoadEmployeePresences(new EmployeePresencePrismaRepository())
}
