import { DbUpdateEmployeePresence } from '@/data/usecases'
import { EmployeePresencePrismaRepository } from '@/infra/db'

export const makeUpdateEmployeePresence = () => {
	return new DbUpdateEmployeePresence(new EmployeePresencePrismaRepository())
}
