import { DbDeleteEmployee } from '@/app/business/data/usecases'
import { EmployeePrismaRepository } from '@/app/business/infra/db'

export const makeDeleteEmployee = () => {
  return new DbDeleteEmployee(new EmployeePrismaRepository())
}
